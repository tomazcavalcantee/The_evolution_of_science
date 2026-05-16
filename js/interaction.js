/**
 * interaction.js — Drag de bonequinhos e pan do mapa
 *
 * Responsabilidades:
 *   - Detectar mousedown em nós vs. fundo do mapa
 *   - Atualizar App.state durante o drag
 *   - Chamar graph.js para redesenhar posições no mousemove
 *
 * Depende de: state.js (App.state), graph.js (updateDraggedNodePosition), data.js (gameData)
 * Não depende de: story.js
 */


/**
 * Registra todos os listeners de mouse no SVG e na window.
 * Deve ser chamado uma única vez, após renderGraph().
 */
function setupInteractionEvents() {
    const svg = document.getElementById('graph-container');

    // Mapa rápido de id → NodeData para uso no drag
    const nodeDataMap = {};
    gameData.nodes.forEach(node => { nodeDataMap[node.id] = node; });

    svg.addEventListener('mousedown',   e => onMouseDown(e, nodeDataMap));
    window.addEventListener('mousemove', e => onMouseMove(e));
    window.addEventListener('mouseup',   ()  => onMouseUp());
}


// ------------------------------------------------------------------
// Handlers de evento
// ------------------------------------------------------------------

/**
 * Determina o que foi clicado (bonequinho ou fundo do mapa)
 * e inicializa o estado de drag adequado.
 *
 * @param {MouseEvent} e
 * @param {Object.<string, NodeData>} nodeDataMap
 */
function onMouseDown(e, nodeDataMap) {
    const mouseCoord = getSVGMousePosition(e);
    const nodeEl = e.target.closest('.node-group');

    if (nodeEl) {
        // --- Drag de bonequinho individual ---
        const nodeData = nodeDataMap[nodeEl.getAttribute('data-id')];

        App.state.isDraggingNode    = true;
        App.state.isDraggingMap     = false;
        App.state.selectedElement   = nodeEl;
        App.state.selectedNodeData  = nodeData;

        // Offset = posição do mouse em relação ao centro do bonequinho
        App.state.nodeDragOffset.x  = mouseCoord.x - nodeData.x;
        App.state.nodeDragOffset.y  = mouseCoord.y - nodeData.y;

    } else if (e.target.id === 'map-bg-capture') {
        // --- Pan do mapa inteiro ---
        App.state.isDraggingNode = false;
        App.state.isDraggingMap  = true;

        // Offset = posição do mouse em relação ao pan atual
        App.state.mapPanOffset.x = mouseCoord.x - App.state.currentPan.x;
        App.state.mapPanOffset.y = mouseCoord.y - App.state.currentPan.y;
    }
}


/**
 * Executa o movimento durante o drag, seja de um bonequinho ou do mapa.
 * @param {MouseEvent} e
 */
function onMouseMove(e) {
    const { isDraggingNode, isDraggingMap, selectedNodeData } = App.state;
    if (!isDraggingNode && !isDraggingMap) return;

    const mouseCoord = getSVGMousePosition(e);

    if (isDraggingNode && selectedNodeData) {
        // Atualiza os dados do nó no gameData (source of truth)
        selectedNodeData.x = mouseCoord.x - App.state.nodeDragOffset.x;
        selectedNodeData.y = mouseCoord.y - App.state.nodeDragOffset.y;

        // Delega a atualização visual para graph.js
        updateDraggedNodePosition();

    } else if (isDraggingMap) {
        App.state.currentPan.x = mouseCoord.x - App.state.mapPanOffset.x;
        App.state.currentPan.y = mouseCoord.y - App.state.mapPanOffset.y;

        // Aplica transformação de pan no grupo raiz do SVG
        App.state.panGroup.setAttribute(
            "transform",
            `translate(${App.state.currentPan.x}, ${App.state.currentPan.y})`
        );
    }
}


/**
 * Encerra qualquer drag ativo ao soltar o mouse.
 */
function onMouseUp() {
    App.state.isDraggingNode   = false;
    App.state.isDraggingMap    = false;
    App.state.selectedElement  = null;
    App.state.selectedNodeData = null;
}


// ------------------------------------------------------------------
// Utilitário
// ------------------------------------------------------------------

/**
 * Converte coordenadas do cliente (viewport) para o sistema de
 * coordenadas interno do SVG, respeitando zoom e pan do browser.
 *
 * @param {MouseEvent} e
 * @returns {{ x: number, y: number }}
 */
function getSVGMousePosition(e) {
    const svg = document.getElementById('graph-container');
    const matrix = svg.getScreenCTM().inverse();
    return {
        x: e.clientX * matrix.a + e.clientY * matrix.c + matrix.e,
        y: e.clientX * matrix.b + e.clientY * matrix.d + matrix.f,
    };
}
