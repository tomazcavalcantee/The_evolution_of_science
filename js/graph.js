/**
 * graph.js — Renderização SVG do mapa
 *
 * Responsabilidades:
 *   - Criar a estrutura de pan (<g id="pan-layer">)
 *   - Desenhar nós (bonequinhos) e arestas (linhas de disputa)
 *   - Atualizar posições SVG durante o arrasto de um nó
 *
 * Depende de: state.js (App.state), data.js (gameData)
 * Não depende de: story.js, interaction.js
 */


/**
 * Cria o grupo raiz <g id="pan-layer"> dentro do SVG.
 * Idempotente: se o pan-layer já existir, apenas reutiliza a referência.
 */
function setupSVGStructure() {
    const svg = document.getElementById('graph-container');

    // Guard: evita criar um segundo pan-layer em caso de dupla inicialização
    let panGroup = document.getElementById('pan-layer');
    if (panGroup) {
        App.state.panGroup = panGroup;
        return;
    }

    panGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    panGroup.setAttribute("id", "pan-layer");

    // Rect invisível no fundo — captura mousedown para o pan do mapa inteiro.
    // Deve ser o primeiro filho do panGroup para ficar abaixo de tudo.
    const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("width", "1000");
    bgRect.setAttribute("height", "800");
    bgRect.setAttribute("fill", "transparent");
    bgRect.setAttribute("id", "map-bg-capture");

    panGroup.appendChild(bgRect);
    svg.appendChild(panGroup);

    App.state.panGroup = panGroup;
}


/**
 * Desenha todos os nós e arestas definidos em `gameData`.
 * Idempotente: limpa o panGroup antes de redesenhar para evitar duplicatas.
 * Deve ser chamado após setupSVGStructure().
 */
async function renderGraph() {
    const { panGroup } = App.state;

    // Guard: remove tudo exceto o bg-rect antes de redesenhar
    const bgRect = document.getElementById('map-bg-capture');
    panGroup.innerHTML = '';
    if (bgRect) panGroup.appendChild(bgRect);

    const nodeMap = buildNodeMap();

    // Arestas primeiro (ficam abaixo dos bonequinhos visualmente)
    gameData.edges.forEach(edge => {
        const line = createEdgeSVG(edge, nodeMap);
        panGroup.appendChild(line);
    });

    // Nós (bonequinhos)
    gameData.nodes.forEach(node => {
        // const charGroup = createNodeSVG(node);
        // panGroup.appendChild(charGroup);

        addCharacterToMap(node, panGroup);
    });
}


// ------------------------------------------------------------------
// Funções de criação de elementos SVG
// ------------------------------------------------------------------

/**
 * Cria o elemento <line> de uma aresta e registra o listener de clique.
 *
 * @param {EdgeData} edge
 * @param {Object.<string, NodeData>} nodeMap
 * @returns {SVGLineElement}
 */
function createEdgeSVG(edge, nodeMap) {
    const source = nodeMap[edge.source];
    const target = nodeMap[edge.target];

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", source.x);
    line.setAttribute("y1", source.y);
    line.setAttribute("x2", target.x);
    line.setAttribute("y2", target.y);
    line.setAttribute("id", edge.id);
    line.classList.add("edge");

    line.addEventListener("click", () => {
        document.querySelectorAll('.edge').forEach(e => e.classList.remove('active'));
        line.classList.add('active');
        renderEdgeDetails(edge);
    });

    return line;
}


/**
 * Cria o grupo <g> de um bonequinho com corpo, cabeça, olhos e label.
 *
 * @param {NodeData} node
 * @returns {SVGGElement}
 */
function createNodeSVG(node) {
    const { x, y, color, label, id } = node;

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("node-group");
    group.setAttribute("data-id", id);

    const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
    body.setAttribute("d", buildBodyPath(x, y));
    body.classList.add("character-body");
    body.setAttribute("stroke", color);

    const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    head.setAttribute("cx", x);
    head.setAttribute("cy", y - 18);
    head.setAttribute("r", 15);
    head.classList.add("character-head");
    head.setAttribute("stroke", color);

    const eye1 = createEye(x - 6, y - 18);
    const eye2 = createEye(x + 6, y - 18);

    const labelEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelEl.setAttribute("x", x);
    labelEl.setAttribute("y", y + 45);
    labelEl.setAttribute("text-anchor", "middle");
    labelEl.classList.add("character-label");
    labelEl.setAttribute("fill", color);
    labelEl.textContent = label;

    group.append(body, head, eye1, eye2, labelEl);
    return group;
}


async function addCharacterToMap(node, panGroup) {
    // Escala de redimensionamento da imagem
    const scale = 0.1;
    const { id, x, y, imgUrl } = node;
    const img = await loadSvg(imgUrl);

    img.classList.add('map-character');
    img.setAttribute("data-id", id);
    img.setAttribute("x", (x - scale*img.getAttribute('width')/2) / scale);
    img.setAttribute("y", (y - scale*img.getAttribute('height')/2) / scale);

    panGroup.append(img);
}


/**
 * Carrega uma imagem svg e retorna um elemento <svg> do html.
 * @param {*} path - Caminho da imagem
 * @returns Elemento <svg> do html.
 */
async function loadSvg(path) {
    const domParser = new DOMParser();
    const baconRes = await fetch(path);
    const baconXml = domParser.parseFromString(await baconRes.text(), 'image/svg+xml');

    return baconXml.activeElement;
}


// ------------------------------------------------------------------
// Atualização de posição durante o drag (chamada por interaction.js)
// ------------------------------------------------------------------

/**
 * Atualiza no SVG apenas os elementos relacionados ao nó em arrasto.
 */
function updateDraggedNodePosition() {
    const { selectedElement, selectedNodeData } = App.state;
    if (!selectedElement || !selectedNodeData) return;

    const { x, y } = selectedNodeData;

    selectedElement.setAttribute("x", x);
    selectedElement.setAttribute("y", y);

    // selectedElement.querySelector('.character-body').setAttribute("d", buildBodyPath(x, y));
    // selectedElement.querySelector('.character-head').setAttribute("cx", x);
    // selectedElement.querySelector('.character-head').setAttribute("cy", y - 18);

    // const eyes = selectedElement.querySelectorAll('.character-eye');
    // eyes[0].setAttribute("cx", x - 6);
    // eyes[0].setAttribute("cy", y - 18);
    // eyes[1].setAttribute("cx", x + 6);
    // eyes[1].setAttribute("cy", y - 18);

    // selectedElement.querySelector('.character-label').setAttribute("x", x);
    // selectedElement.querySelector('.character-label').setAttribute("y", y + 45);

    const nodeMap = buildNodeMap();
    gameData.edges.forEach(edge => {
        if (edge.source !== selectedNodeData.id && edge.target !== selectedNodeData.id) return;

        const line = document.getElementById(edge.id);
        const source = nodeMap[edge.source];
        const target = nodeMap[edge.target];
        line.setAttribute("x1", source.x);
        line.setAttribute("y1", source.y);
        line.setAttribute("x2", target.x);
        line.setAttribute("y2", target.y);
    });
}


// ------------------------------------------------------------------
// Utilitários internos
// ------------------------------------------------------------------

function buildNodeMap() {
    const map = {};
    gameData.nodes.forEach(node => { map[node.id] = node; });
    return map;
}

function buildBodyPath(x, y) {
    return `M ${x-12} ${y+20} L ${x-12} ${y+8} Q ${x} ${y-8} ${x+12} ${y+8} L ${x+12} ${y+20}`;
}

function createEye(cx, cy) {
    const eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    eye.setAttribute("cx", cx);
    eye.setAttribute("cy", cy);
    eye.setAttribute("r", 2);
    eye.classList.add("character-eye");
    return eye;
}
