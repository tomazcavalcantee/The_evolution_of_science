/**
 * state.js — Namespace global `App` e estado compartilhado
 *
 * Todos os módulos lêem e escrevem em `App.state` em vez de
 * usarem variáveis globais soltas. Isso facilita rastrear bugs
 * e entender o que está acontecendo em qualquer momento.
 *
 * PARA COLABORADORES:
 *   - Nunca declare `let isDragging...` no topo de outro arquivo.
 *   - Use `App.state.isDraggingNode`, etc.
 *   - Adicione novos campos de estado aqui com um comentário explicativo.
 */

const App = {

    // ------------------------------------------------------------------
    // Estado de interação (gerenciado por interaction.js)
    // ------------------------------------------------------------------
    state: {
        isDraggingNode: false,   // true enquanto o usuário arrasta um bonequinho
        isDraggingMap:  false,   // true enquanto o usuário arrasta o fundo do mapa

        selectedElement:  null,  // O elemento <g> do bonequinho em arrasto
        selectedNodeData: null,  // O objeto JSON do bonequinho em arrasto (de gameData.nodes)

        nodeDragOffset: { x: 0, y: 0 }, // Offset mouse → bonequinho no início do drag
        mapPanOffset:   { x: 0, y: 0 }, // Offset mouse → câmera no início do pan
        currentPan:     { x: 0, y: 0 }, // Posição atual da "câmera" do mapa

        panGroup: null, // Referência ao <g id="pan-layer"> criado por graph.js
    },

    // ------------------------------------------------------------------
    // Registro de capítulos (gerenciado pelos arquivos em chapters/)
    // ------------------------------------------------------------------
    /**
     * Mapa de id → módulo de capítulo.
     * Preenchido automaticamente via App.registerChapter().
     * @type {Object.<string, ChapterModule>}
     */
    chapters: {},

    /**
     * Registra um módulo de capítulo para ser lançado pela story.js.
     *
     * @param {string} id     - Deve ser igual ao `chapterId` em gameData.edges.
     * @param {ChapterModule} module - Objeto com pelo menos o método `start(container)`.
     *
     * @example
     * // Em chapters/cap_meu_novo.js:
     * App.registerChapter("cap_meu_novo", {
     *   start(container) { container.innerHTML = "<p>Olá!</p>"; }
     * });
     */
    registerChapter(id, module) {
        if (this.chapters[id]) {
            console.warn(`[App] Capítulo "${id}" já estava registrado e foi substituído.`);
        }
        this.chapters[id] = module;
    },
};

/**
 * @typedef {Object} ChapterModule
 * @property {function(HTMLElement): void} start
 *   Função chamada por story.js ao clicar em "Iniciar Debate".
 *   Recebe o contêiner HTML do painel de história para renderizar o conteúdo.
 */
