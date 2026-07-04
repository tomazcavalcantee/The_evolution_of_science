/**
 * graph.js — Renderização SVG do mapa
 *
 * Papel:
 *   - Criar a estrutura de pan (<g id="pan-layer">)
 *   - Desenhar nós e arestas coloridas por classe de debate
 *   - Renderizar a legenda de classes de debate
 *   - Curvar arestas múltiplas entre o mesmo par de nós
 *   - Atualizar posições durante o drag
 *   - Aplicar dimming em arestas não selecionadas
 *
 * Depende de: state.js (App.state), data.js (gameData)
 */


// ------------------------------------------------------------------
// Inicialização da estrutura SVG
// ------------------------------------------------------------------

function setupSVGStructure() {
    const svg = document.getElementById('graph-container');

    let panGroup = document.getElementById('pan-layer');
    if (panGroup) { App.state.panGroup = panGroup; return; }

    panGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    panGroup.setAttribute("id", "pan-layer");

    const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("width", "1000");
    bgRect.setAttribute("height", "800");
    bgRect.setAttribute("fill", "transparent");
    bgRect.setAttribute("id", "map-bg-capture");

    panGroup.appendChild(bgRect);
    svg.appendChild(panGroup);
    App.state.panGroup = panGroup;
}


// ------------------------------------------------------------------
// Renderização principal
// ------------------------------------------------------------------

function renderGraph() {
    const { panGroup } = App.state;
    const svg = document.getElementById('graph-container');
    const bgRect = document.getElementById('map-bg-capture');
    panGroup.innerHTML = '';
    if (bgRect) panGroup.appendChild(bgRect);

    const nodeMap     = buildNodeMap();
    const classMap    = buildClassMap();
    const pairOffsets = computePairOffsets(); // { edgeId → curveOffset }

    // Arestas primeiro (abaixo dos nós)
    gameData.edges.forEach(edge => {
        const debateClass = classMap[edge.debateClassId];
        const offset      = pairOffsets[edge.id];
        const pathEl      = createEdgeSVG(edge, nodeMap, debateClass, offset);
        panGroup.appendChild(pathEl);
    });

    // Nós
    gameData.nodes.forEach(node => {
        panGroup.appendChild(createNodeSVG(node));
    });

    // Legenda
    const oldLegend = svg.querySelector('.legend-group');
    if (oldLegend) {
        oldLegend.remove();
    }
    renderLegend(svg, classMap);

    // Invalida cache de drag (posições podem ter mudado)
    App.invalidateDragCache();
}


// ------------------------------------------------------------------
// Criação de elementos SVG
// ------------------------------------------------------------------

/**
 * Cria um <path> de aresta curvada e um <path> invisível mais largo
 * para facilitar o clique.
 * Retorna um <g> que agrupa os dois.
 *
 * @param {EdgeData}    edge
 * @param {Object}      nodeMap
 * @param {DebateClass} debateClass
 * @param {number}      curveOffset - deslocamento perpendicular em px (0 = linha reta)
 * @returns {SVGGElement}
 */
function createEdgeSVG(edge, nodeMap, debateClass, curveOffset) {
    const source = nodeMap[edge.source];
    const target = nodeMap[edge.target];
    const color  = debateClass ? debateClass.color : '#999';

    const wrapper = document.createElementNS("http://www.w3.org/2000/svg", "g");
    wrapper.setAttribute("id", edge.id);
    wrapper.setAttribute("data-class", edge.debateClassId);
    wrapper.classList.add("edge-group");

    // Caminho visual
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", buildCurvePath(source, target, curveOffset));
    path.classList.add("edge");
    path.setAttribute("stroke", color);
    path.setAttribute("fill", "none");

    // Caminho invisível mais largo para capturar cliques com mais facilidade
    const hitPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hitPath.setAttribute("d", buildCurvePath(source, target, curveOffset));
    hitPath.classList.add("edge-hit");
    hitPath.setAttribute("fill", "none");
    hitPath.setAttribute("stroke", "transparent");
    hitPath.setAttribute("stroke-width", "20");
    hitPath.style.cursor = "pointer";

    hitPath.addEventListener("click", () => {
        // Remove estado ativo e dimmed de todas as arestas
        document.querySelectorAll('.edge').forEach(e => e.classList.remove('active'));
        document.querySelectorAll('.edge-group').forEach(g => {
            g.classList.remove('active');
            g.classList.remove('dimmed');
        });

        // Ativa esta aresta
        path.classList.add('active');
        wrapper.classList.add('active');

        // Aplica dimming nas outras arestas
        document.querySelectorAll('.edge-group').forEach(g => {
            if (g !== wrapper) {
                g.classList.add('dimmed');
            }
        });

        renderEdgeDetails(edge, debateClass);
    });

    wrapper.appendChild(path);
    wrapper.appendChild(hitPath);
    return wrapper;
}


/**
 * Cria o grupo <g> de um bonequinho.
 *
 * @param {NodeData} node
 * @returns {SVGGElement}
 */
function createNodeSVG(node) {
    const { x, y, color, label, id, img } = node;

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("node-group");
    group.setAttribute("data-id", id);

    // Se existir um caminho de imagem, carrega a arte
    if (img) {
        const imageEl = document.createElementNS("http://www.w3.org/2000/svg", "image");
        imageEl.setAttribute("href", img);
        
        // Tamanho da sua arte (ajuste 60 para mais ou menos se necessário)
        const size = 60; 
        imageEl.setAttribute("width", size);
        imageEl.setAttribute("height", size);
        
        // Centraliza a imagem no eixo X e Y
        imageEl.setAttribute("x", x - (size / 2));
        imageEl.setAttribute("y", y - (size / 2) - 10); // -10 para compensar o espaço da cabeça
        
        imageEl.classList.add("character-image");
        group.appendChild(imageEl);
    } 
    // Se não existir imagem, desenha o bonequinho padrão
    else {
        const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
        body.setAttribute("d", buildBodyPath(x, y));
        body.classList.add("character-body");
        body.setAttribute("stroke", color);

        const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        head.setAttribute("cx", x); head.setAttribute("cy", y - 18); head.setAttribute("r", 15);
        head.classList.add("character-head");
        head.setAttribute("stroke", color);

        const eye1 = createEye(x - 6, y - 18);
        const eye2 = createEye(x + 6, y - 18);

        group.append(body, head, eye1, eye2);
    }

    // O texto (Label) é comum a ambos
    const labelEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelEl.setAttribute("x", x); 
    labelEl.setAttribute("y", y + 45);
    labelEl.setAttribute("text-anchor", "middle");
    labelEl.classList.add("character-label");
    labelEl.setAttribute("fill", color);
    labelEl.textContent = label;

    group.appendChild(labelEl);
    return group;
}


// ------------------------------------------------------------------
// Legenda de classes de debate
// ------------------------------------------------------------------

/**
 * Renderiza a legenda de classes de debate no canto do mapa SVG.
 *
 * @param {SVGGElement} svgNode — grupo raiz do mapa
 * @param {Object} classMap — mapa debateClassId → debateClass
 */
function renderLegend(svgNode, classMap) {
    const classes = gameData.debateClasses;
    if (!classes || classes.length === 0) return;

    // Dimensões e posição
    const LEGEND_X      = 10;
    const LEGEND_Y      = 10;
    const PADDING       = 12;
    const ROW_HEIGHT    = 22;
    const TITLE_HEIGHT  = 20;
    const SEP_GAP       = 8;
    const DOT_RADIUS    = 5;
    const LEGEND_WIDTH  = 200;
    const LEGEND_HEIGHT = PADDING + TITLE_HEIGHT + SEP_GAP + (classes.length * ROW_HEIGHT) + PADDING;

    const legendGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    legendGroup.classList.add("legend-group");

    // Fundo
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", LEGEND_X);
    bg.setAttribute("y", LEGEND_Y);
    bg.setAttribute("width", LEGEND_WIDTH);
    bg.setAttribute("height", LEGEND_HEIGHT);
    bg.classList.add("legend-bg");
    legendGroup.appendChild(bg);

    // Título
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", LEGEND_X + PADDING);
    title.setAttribute("y", LEGEND_Y + PADDING);
    title.classList.add("legend-title");
    title.textContent = "Classes de Debate";
    legendGroup.appendChild(title);

    // Separador
    const sepY = LEGEND_Y + PADDING + TITLE_HEIGHT;
    const sep = document.createElementNS("http://www.w3.org/2000/svg", "line");
    sep.setAttribute("x1", LEGEND_X + PADDING);
    sep.setAttribute("y1", sepY);
    sep.setAttribute("x2", LEGEND_X + LEGEND_WIDTH - PADDING);
    sep.setAttribute("y2", sepY);
    sep.classList.add("legend-sep");
    legendGroup.appendChild(sep);

    // Itens
    const startY = sepY + SEP_GAP + DOT_RADIUS;
    classes.forEach((dc, i) => {
        const rowY = startY + i * ROW_HEIGHT;

        // Dot colorido
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", LEGEND_X + PADDING + DOT_RADIUS);
        dot.setAttribute("cy", rowY);
        dot.setAttribute("r", DOT_RADIUS);
        dot.setAttribute("fill", dc.color);
        dot.classList.add("legend-dot");
        legendGroup.appendChild(dot);

        // Label de texto
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", LEGEND_X + PADDING + DOT_RADIUS * 2 + 8);
        label.setAttribute("y", rowY);
        label.setAttribute("fill", dc.color);
        label.classList.add("legend-label");
        label.textContent = dc.label;
        legendGroup.appendChild(label);
    });

    svgNode.appendChild(legendGroup);
}


// ------------------------------------------------------------------
// Atualização de posição durante o drag
// ------------------------------------------------------------------

function updateDraggedNodePosition() {
    const { selectedElement, selectedNodeData } = App.state;
    if (!selectedElement || !selectedNodeData) return;

    const { x, y } = selectedNodeData;

    // Procura se o elemento arrastado é uma imagem externa
    const imageEl = selectedElement.querySelector('.character-image');
    
    if (imageEl) {
        // Atualiza a coordenada da imagem
        const size = 60;
        imageEl.setAttribute("x", x - (size / 2));
        imageEl.setAttribute("y", y - (size / 2) - 10);
    } else {
        // Atualiza a coordenada do bonequinho padrão
        selectedElement.querySelector('.character-body').setAttribute("d", buildBodyPath(x, y));
        selectedElement.querySelector('.character-head').setAttribute("cx", x);
        selectedElement.querySelector('.character-head').setAttribute("cy", y - 18);

        const eyes = selectedElement.querySelectorAll('.character-eye');
        eyes[0].setAttribute("cx", x - 6); eyes[0].setAttribute("cy", y - 18);
        eyes[1].setAttribute("cx", x + 6); eyes[1].setAttribute("cy", y - 18);
    }

    // Atualiza o texto abaixo do personagem
    selectedElement.querySelector('.character-label').setAttribute("x", x);
    selectedElement.querySelector('.character-label').setAttribute("y", y + 45);

    // Usa cache para performance — calcula uma vez por drag, não por frame
    if (!App.state._cachedNodeMap) {
        App.state._cachedNodeMap = buildNodeMap();
    }
    if (!App.state._cachedPairOffsets) {
        App.state._cachedPairOffsets = computePairOffsets();
    }

    const nodeMap     = App.state._cachedNodeMap;
    const pairOffsets = App.state._cachedPairOffsets;

    gameData.edges.forEach(edge => {
        if (edge.source !== selectedNodeData.id && edge.target !== selectedNodeData.id) return;

        const wrapper = document.getElementById(edge.id);
        if (!wrapper) return;

        const src    = nodeMap[edge.source];
        const tgt    = nodeMap[edge.target];
        const offset = pairOffsets[edge.id];
        const newD   = buildCurvePath(src, tgt, offset);

        wrapper.querySelectorAll('path').forEach(p => p.setAttribute("d", newD));
    });
}


// ------------------------------------------------------------------
// Utilitários de geometria
// ------------------------------------------------------------------

/**
 * Distribui offsets de curvatura entre arestas que conectam o mesmo par.
 *
 * @returns {Object.<string, number>} mapa edgeId → curveOffset
 */
function computePairOffsets() {
    const STEP = 45; // distância entre curvas paralelas (px)

    // Agrupar arestas por par canônico
    const groups = {}; // pairKey → [edgeId, ...]
    gameData.edges.forEach(edge => {
        const key = [edge.source, edge.target].sort().join('::');
        if (!groups[key]) groups[key] = [];
        groups[key].push(edge.id);
    });

    // Calcular offset de cada aresta
    const result = {};
    Object.values(groups).forEach(ids => {
        const n = ids.length;
        // Para n=1: [0]; n=2: [-22.5, 22.5]; n=3: [-45, 0, 45]; etc.
        const start = -((n - 1) / 2) * STEP;
        ids.forEach((id, i) => { result[id] = start + i * STEP; });
    });

    return result;
}

/**
 * Constrói o atributo `d` de um path de curva quadrática de Bézier.
 *
 * @param {{x:number, y:number}} src
 * @param {{x:number, y:number}} tgt
 * @param {number} offset
 * @returns {string}
 */
function buildCurvePath(src, tgt, offset) {
    const mx = (src.x + tgt.x) / 2;
    const my = (src.y + tgt.y) / 2;

    const dx  = tgt.x - src.x;
    const dy  = tgt.y - src.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const px  = -dy / len;
    const py  =  dx / len;

    const cx = mx + offset * px;
    const cy = my + offset * py;

    return `M ${src.x} ${src.y} Q ${cx} ${cy} ${tgt.x} ${tgt.y}`;
}

function buildNodeMap() {
    const map = {};
    gameData.nodes.forEach(n => { map[n.id] = n; });
    return map;
}

function buildClassMap() {
    const map = {};
    gameData.debateClasses.forEach(c => { map[c.id] = c; });
    return map;
}

function buildBodyPath(x, y) {
    return `M ${x-12} ${y+20} L ${x-12} ${y+8} Q ${x} ${y-8} ${x+12} ${y+8} L ${x+12} ${y+20}`;
}

function createEye(cx, cy) {
    const eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    eye.setAttribute("cx", cx); eye.setAttribute("cy", cy); eye.setAttribute("r", 2);
    eye.classList.add("character-eye");
    return eye;
}
