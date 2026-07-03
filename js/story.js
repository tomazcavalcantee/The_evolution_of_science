/**
 * story.js — Painel narrativo (lado direito da tela)
 *
 * Papel:
 *   - Renderizar o texto de introdução
 *   - Renderizar os detalhes de uma aresta ao ser clicada
 *   - Lançar o capítulo via App.chapters
 *
 * Depende de: state.js (App.chapters), data.js (gameData)
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
 * Preenche a zona dinâmica com as informações da aresta clicada.
 *
 * @param {EdgeData}    edgeData
 * @param {DebateClass} debateClass - objeto da classe (cor, label, ícone)
 */
function renderEdgeDetails(edgeData, debateClass) {
    const detailEl     = document.getElementById('detail-content');
    const btnContainer = document.getElementById('button-container');

    // Registra a edge selecionada no estado
    App.state.selectedEdgeId = edgeData.id;

    // Replay da animação fade-in
    detailEl.classList.remove('fade-in');
    void detailEl.offsetWidth;
    detailEl.classList.add('fade-in');

    // Badge da classe de debate (faixa colorida com o nome da classe)
    const badgeColor = debateClass ? debateClass.color : '#999';
    const badgeLabel = debateClass ? debateClass.label : edgeData.debateClassId;
    const classDesc  = debateClass ? debateClass.desc  : '';

    detailEl.innerHTML = `
        <div class="debate-class-badge" style="border-color:${badgeColor}; color:${badgeColor};">
            ${badgeLabel}
        </div>
        <p class="debate-class-desc">${classDesc}</p>
        <h3>${edgeData.title}</h3>
        <p>${edgeData.desc}</p>
    `;

    btnContainer.innerHTML = '';
    btnContainer.appendChild(createChapterButton(edgeData, debateClass));
}


// ------------------------------------------------------------------
// Funções internas
// ------------------------------------------------------------------

/**
 * Cria o botão de iniciar debate. Desabilita se o capítulo
 * não está registrado (com feedback "Em breve").
 */
function createChapterButton(edgeData, debateClass) {
    const btn = document.createElement('button');
    const icon  = debateClass ? debateClass.icon : '';
    const isRegistered = !!App.chapters[edgeData.chapterId];

    if (isRegistered) {
        btn.className = 'btn-choice active';
        btn.innerHTML = `${icon} Iniciar Debate`;

        if (debateClass) {
            btn.style.setProperty('--btn-class-color', debateClass.color);
            btn.classList.add('btn-choice--colored');
        }

        btn.addEventListener('click', () => launchChapter(edgeData.chapterId));
    } else {
        // Capítulo não registrado — botão desabilitado
        btn.className = 'btn-choice btn-choice--coming-soon';
        btn.innerHTML = `${icon} Em breve`;
        btn.disabled = true;
        btn.title = 'Este capítulo ainda não foi implementado.';
    }

    return btn;
}


function launchChapter(chapterId) {
    const chapter = App.chapters[chapterId];

    if (!chapter) {
        console.warn(`[story.js] Capítulo "${chapterId}" não encontrado.`);
        const detailEl = document.getElementById('detail-content');
        if (detailEl) {
            detailEl.innerHTML += '<p class="chapter-not-found">⚠ Capítulo não encontrado.</p>';
        }
        return;
    }

    // Registra a transição no estado
    App.enterChapter(chapterId);

    // Transição de Interface
    const mapUi = document.getElementById('map-ui');
    const chapterUi = document.getElementById('chapter-ui');

    mapUi.style.display = 'none';
    
    chapterUi.innerHTML = '';
    chapterUi.style.display = 'flex';

    chapter.start(chapterUi);
}