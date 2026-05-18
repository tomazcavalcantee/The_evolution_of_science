/**
 * chapters/_template.js — Template para novos capítulos
 *
 * ============================================================
 * COMO CRIAR UM NOVO CAPÍTULO (passo a passo):
 * ============================================================
 *
 * 1. Copie este arquivo para `chapters/cap_meu_tema.js`
 *    (o nome deve ser igual ao `chapterId` em gameData.edges).
 *
 * 2. Substitua "cap_meu_tema" pelo seu chapterId real.
 *
 * 3. Implemente `start(container)`:
 *    - `container` é o div #chapter-ui (painel lateral inteiro).
 *    - Inclua sempre um botão "Voltar ao Mapa" que chame `_goBack()`.
 *    - Para cenas visuais no mapa, use `App.state.panGroup` diretamente
 *      e restaure com `renderGraph()` ao voltar.
 *
 * 4. Adicione o <script> em index.html ANTES de graph.js.
 *
 * 5. Em data.js, adicione uma aresta com `chapterId: "cap_meu_tema"`.
 *
 * 6. Atualize chapters.json com os metadados do capítulo.
 * ============================================================
 */

App.registerChapter("cap_meu_tema", {

    /**
     * Ponto de entrada. Chamado por story.js ao clicar "Iniciar Debate".
     *
     * @param {HTMLElement} container — o div #chapter-ui do painel lateral.
     */
    start(container) {
        this._container = container;

        container.innerHTML = `
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                <h3 style="margin-top: 0;">Título do Debate</h3>
                <p>Descrição introdutória da cena interativa...</p>
                <p><em>Implemente sua cena aqui.</em></p>
            </div>

            <div class="chapter-controls">
                <button id="btn-back" class="btn-choice">← Voltar ao Mapa</button>
            </div>
        `;

        document.getElementById('btn-back')
            .addEventListener('click', () => this._goBack());
    },

    /** Restaura o painel lateral e o mapa epistêmico. */
    _goBack() {
        document.getElementById('chapter-ui').style.display = 'none';
        document.getElementById('map-ui').style.display     = 'block';
        renderGraph(); // redesenha os filósofos e as arestas
    },

    // ------------------------------------------------------------------
    // Métodos auxiliares internos (prefixo _ por convenção)
    // ------------------------------------------------------------------

    _handleChoice(choice) {
        // Exemplo de resposta a uma escolha do usuário
        this._container.querySelector('p').textContent =
            `Você escolheu: ${choice}.`;
    },
});