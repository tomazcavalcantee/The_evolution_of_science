/**
 * state.js — Namespace global `App` e estado compartilhado
 *
 * Todos os módulos lêem e escrevem em `App.state` em vez de
 * usarem variáveis globais soltas. Isso facilita rastrear bugs
 * e entender o que está acontecendo em qualquer momento.
 *
 *   - Nunca declare `let isDragging...` no topo de outro arquivo.
 *   - Use `App.state.isDraggingNode`, etc.
 *   - Adicione novos campos de estado aqui com um comentário explicativo.
 */

const App = {

    // ------------------------------------------------------------------
    // Estado de interação (interaction.js)
    // ------------------------------------------------------------------
    state: {
        isDraggingNode: false,   // true enquanto o usuário arrasta um bonequinho
        isDraggingMap:  false,   // true enquanto o usuário arrasta o fundo do mapa

        selectedElement:  null,  // O elemento <g> do bonequinho em arrasto
        selectedNodeData: null,  // O objeto JSON do boneco em arrasto (gameData.nodes)

        nodeDragOffset: { x: 0, y: 0 }, // Offset mouse → boneco no início do drag
        mapPanOffset:   { x: 0, y: 0 }, // Offset mouse → câmera no início do pan
        currentPan:     { x: 0, y: 0 }, // Posição atual da "câmera" do mapa

        panGroup: null, // Referência ao <g id="pan-layer"> criado por graph.js

        // ---------------------------------------------------------------
        // Estado de navegação (NOVO)
        // ---------------------------------------------------------------
        currentView:    'map',   // 'map' | 'chapter'
        currentChapter: null,    // id do capítulo ativo ou null
        selectedEdgeId: null,    // id da edge selecionada no mapa ou null

        // Cache para performance durante drag
        _cachedNodeMap:     null,
        _cachedPairOffsets: null,
    },

    // ------------------------------------------------------------------
    // Registro de capítulos (chapters/)
    // ------------------------------------------------------------------
    /**
     * Mapa de id → módulo de capítulo.
     * Preenchido via App.registerChapter().
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

    // ------------------------------------------------------------------
    // Helpers de transição (usados por ChapterEngine e story.js)
    // ------------------------------------------------------------------

    /**
     * Transição para a view de capítulo.
     * @param {string} chapterId
     */
    enterChapter(chapterId) {
        this.state.currentView    = 'chapter';
        this.state.currentChapter = chapterId;
    },

    /**
     * Transição de volta ao mapa.
     */
    returnToMap() {
        this.state.currentView    = 'map';
        this.state.currentChapter = null;
        this.state.selectedEdgeId = null;
    },

    /**
     * Invalida o cache de drag (chamado quando nós mudam de posição).
     */
    invalidateDragCache() {
        this.state._cachedNodeMap     = null;
        this.state._cachedPairOffsets = null;
    },
};

/**
 * @typedef {Object} ChapterModule
 * @property {string} id - Identificador único do capítulo
 * @property {string} title - Título exibido na sidebar
 * @property {function(HTMLElement): void} start
 *   Função chamada por story.js ao clicar em "Iniciar Debate".
 *   Recebe o contêiner HTML do painel de história para renderizar o conteúdo.
 * @property {Object} [chars] - Personagens para a cena SVG (opcional)
 * @property {string} [background] - Caminho para o fundo SVG da cena (opcional)
 * @property {Array.<{speaker:string, text:string}>} [story] - Roteiro de diálogos (opcional)
 */
