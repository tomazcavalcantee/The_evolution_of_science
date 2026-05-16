/**
 * story.js — Painel narrativo (lado direito da tela)
 *
 * Responsabilidades:
 *   - Renderizar o texto de introdução estático
 *   - Renderizar os detalhes de uma aresta ao ser clicada
 *   - Lançar o capítulo interativo correspondente via App.chapters
 *
 * Depende de: state.js (App.chapters), data.js (gameData)
 * Não depende de: graph.js, interaction.js
 */


/**
 * Preenche a zona de introdução (#intro-content) com os parágrafos
 * definidos em gameData.intro. Chamada uma única vez na inicialização.
 */
function renderInitialStory() {
    const introEl = document.getElementById('intro-content');
    introEl.innerHTML = '';

    gameData.intro.forEach(text => {
        const p = document.createElement('p');
        p.innerHTML = text;
        introEl.appendChild(p);
    });
}


/**
 * Preenche a zona dinâmica (#detail-content e #button-container)
 * com as informações da aresta clicada e o botão de lançamento do capítulo.
 *
 * @param {EdgeData} edgeData - Objeto da aresta vindo de gameData.edges.
 */
function renderEdgeDetails(edgeData) {
    const detailEl  = document.getElementById('detail-content');
    const btnContainer = document.getElementById('button-container');

    // Força o replay da animação de surgimento (fade-in)
    detailEl.classList.remove('fade-in');
    void detailEl.offsetWidth; // Trick para reiniciar a animação CSS
    detailEl.classList.add('fade-in');

    detailEl.innerHTML = `
        <h3>${edgeData.title}</h3>
        <p>${edgeData.desc}</p>
    `;

    btnContainer.innerHTML = '';
    const btn = createChapterButton(edgeData);
    btnContainer.appendChild(btn);
}


// ------------------------------------------------------------------
// Funções internas
// ------------------------------------------------------------------

/**
 * Cria o botão "Iniciar Debate" para o capítulo associado à aresta.
 * Se o capítulo ainda não estiver registrado em App.chapters, exibe
 * uma mensagem de aviso em vez de lançar.
 *
 * @param {EdgeData} edgeData
 * @returns {HTMLButtonElement}
 */
function createChapterButton(edgeData) {
    const btn = document.createElement('button');
    btn.className = 'btn-choice active';
    btn.innerHTML = `${edgeData.icon} Iniciar Debate`;

    btn.addEventListener('click', () => launchChapter(edgeData.chapterId));

    return btn;
}


/**
 * Lança o capítulo identificado por `chapterId`.
 * O capítulo deve estar registrado via App.registerChapter() em seu arquivo.
 *
 * @param {string} chapterId
 */
function launchChapter(chapterId) {
    const chapter = App.chapters[chapterId];

    if (!chapter) {
        console.warn(
            `[story.js] Capítulo "${chapterId}" não encontrado em App.chapters.\n` +
            `Verifique se o arquivo chapters/${chapterId}.js está incluído no index.html.`
        );

        // Feedback visual provisório para o colaborador que ainda não implementou o capítulo
        const detailEl = document.getElementById('detail-content');
        detailEl.innerHTML += `
            <p style="color: var(--accent-red); font-style: italic;">
                ⚠️ Capítulo <strong>${chapterId}</strong> ainda não implementado.<br>
                Crie o arquivo <code>chapters/${chapterId}.js</code> e registre-o com
                <code>App.registerChapter("${chapterId}", { start(container) { ... } })</code>.
            </p>
        `;
        return;
    }

    // Passa o contêiner de detalhes para o capítulo renderizar sua cena
    const container = document.getElementById('detail-content');
    chapter.start(container);
}
