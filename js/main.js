document.addEventListener("DOMContentLoaded", () => {
    renderStory();  
    renderGraph();
    renderUI();
});

// --- FUNÇÃO PARA INJETAR A NARRATIVA ---
function renderStory() {
    const titleElement = document.getElementById('story-title');
    const contentElement = document.getElementById('story-content');

    // Limpa o conteúdo anterior (útil para quando trocar de capítulo)
    contentElement.innerHTML = '';

    // Injeta o título
    titleElement.textContent = gameData.scene.title;

    // Injeta os parágrafos
    gameData.scene.paragraphs.forEach(text => {
        const p = document.createElement('p');
        p.innerHTML = text; // Usamos innerHTML porque temos a tag <strong> no texto
        contentElement.appendChild(p);
    });
}

// --- FUNÇÕES DE RENDERIZAÇÃO DO GRAFO ---

function renderGraph() {
    const svg = document.getElementById('graph-container');
    const nodeMap = {};

    // 1. Mapear nós para fácil acesso
    gameData.nodes.forEach(node => nodeMap[node.id] = node);

    // 2. Desenhar Arestas (Linhas conectando os personagens)
    gameData.edges.forEach(edge => {
        const source = nodeMap[edge.source];
        const target = nodeMap[edge.target];

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", source.x);
        line.setAttribute("y1", source.y);
        line.setAttribute("x2", target.x);
        line.setAttribute("y2", target.y);
        line.classList.add("edge");
        
        svg.appendChild(line);
    });

    // 3. Desenhar Nós (Os Personagens)
    gameData.nodes.forEach(node => {
        const charGroup = createCharacterSVG(node.x, node.y, node.color, node.label);
        svg.appendChild(charGroup);
    });
}

// Cria um bonequinho minimalista (estilo The Evolution of Trust)
function createCharacterSVG(x, y, strokeColor, name) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Corpo (um 'U' invertido com perninhas)
    const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
    body.setAttribute("d", `M ${x-12} ${y+25} L ${x-12} ${y+10} Q ${x} ${y-5} ${x+12} ${y+10} L ${x+12} ${y+25}`);
    body.classList.add("character-body");
    body.setAttribute("stroke", strokeColor);

    // Cabeça
    const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    head.setAttribute("cx", x);
    head.setAttribute("cy", y - 15);
    head.setAttribute("r", 16);
    head.classList.add("character-head");
    head.setAttribute("stroke", strokeColor);

    // Olhos
    const eye1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    eye1.setAttribute("cx", x - 6);
    eye1.setAttribute("cy", y - 15);
    eye1.setAttribute("r", 2);
    eye1.classList.add("character-eye");

    const eye2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    eye2.setAttribute("cx", x + 6);
    eye2.setAttribute("cy", y - 15);
    eye2.setAttribute("r", 2);
    eye2.classList.add("character-eye");

    // Nome (Rótulo)
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x);
    label.setAttribute("y", y + 45);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "14px");
    label.setAttribute("font-weight", "bold");
    label.setAttribute("fill", strokeColor);
    label.textContent = name;

    // Montar o grupo
    group.appendChild(body);
    group.appendChild(head);
    group.appendChild(eye1);
    group.appendChild(eye2);
    group.appendChild(label);

    return group;
}

// --- FUNÇÕES DE RENDERIZAÇÃO DA INTERFACE ---

function renderUI() {
    const btnContainer = document.getElementById('button-container');

    gameData.edges.forEach(edge => {
        const btn = document.createElement("button");
        btn.classList.add("btn-choice");
        btn.innerHTML = `${edge.btnIcon} ${edge.btnLabel}`;
        
        btn.addEventListener("click", () => {
            alert(`Iniciando a simulação: ${edge.chapterId}`);
            // Aqui você chamará a função que oculta essa tela e inicia o capítulo do Peru
        });

        btnContainer.appendChild(btn);
    });
}