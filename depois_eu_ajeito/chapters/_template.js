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
 * 2. Substitua "cap_meu_tema" pelo seu chapterId real em todos os lugares.
 *
 * 3. Implemente o método `start(container)`:
 *    - `container` é o <div id="detail-content"> do painel lateral.
 *    - Você pode usar innerHTML, appendChild, ou qualquer lógica de UI.
 *    - Para debates interativos, adicione botões com event listeners.
 *
 * 4. Adicione seu arquivo em dois lugares do index.html:
 *    a) <script src="chapters/cap_meu_tema.js"></script>
 *    b) A entrada correspondente em chapters.json.
 *
 * 5. Em data.js, adicione uma aresta com `chapterId: "cap_meu_tema"`.
 * ============================================================
 */

App.registerChapter("cap_meu_tema", {

    /**
     * Ponto de entrada do capítulo.
     * Chamado por story.js quando o usuário clica em "Iniciar Debate".
     *
     * @param {HTMLElement} container - O div #detail-content do painel lateral.
     */
    start(container) {
        container.innerHTML = `
            <h3>Título do Debate</h3>
            <p>Descrição introdutória da cena interativa...</p>

            <p><em>Implemente sua cena aqui.</em></p>
        `;

        // Exemplo de botão de escolha interativa:
        // const btn = document.createElement('button');
        // btn.className = 'btn-choice';
        // btn.textContent = 'Minha opção';
        // btn.addEventListener('click', () => this._handleChoice('opcao_a', container));
        // container.appendChild(btn);
    },

    // ------------------------------------------------------------------
    // Métodos auxiliares internos do capítulo (prefixo _ por convenção)
    // ------------------------------------------------------------------

    /**
     * Exemplo de handler para escolha do usuário.
     * @param {string} choice
     * @param {HTMLElement} container
     */
    _handleChoice(choice, container) {
        container.innerHTML = `<p>Você escolheu: <strong>${choice}</strong>.</p>`;
    },
});
