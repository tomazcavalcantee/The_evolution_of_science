/**
 * story.js — Painel narrativo (lado direito da tela)
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

function renderEdgeDetails(edgeData) {
    const detailEl  = document.getElementById('detail-content');
    const btnContainer = document.getElementById('button-container');

    detailEl.classList.remove('fade-in');
    void detailEl.offsetWidth; 
    detailEl.classList.add('fade-in');

    // Aqui o título e a descrição são colocados inicialmente
    detailEl.innerHTML = `
        <div id="edge-info">
            <h3>${edgeData.title}</h3>
            <p>${edgeData.desc}</p>
        </div>
    `;

    btnContainer.innerHTML = '';
    const btn = createChapterButton(edgeData);
    btnContainer.appendChild(btn);
}

function createChapterButton(edgeData) {
    const btn = document.createElement('button');
    btn.className = 'btn-choice active';
    btn.innerHTML = `${edgeData.icon} Iniciar Debate`;

    btn.addEventListener('click', () => {
        // 1. Ativa a expansão do mapa no CSS
        const container = document.querySelector('.container');
        container.classList.add('fullscreen-map');

        // 2. Lança o capítulo
        launchChapter(edgeData.chapterId);
    });

    return btn;
}

function launchChapter(chapterId) {
    const chapter = App.chapters[chapterId];
    const container = document.getElementById('detail-content');

    if (!chapter) {
        // Se der erro, ele avisa no container vazio
        container.innerHTML = `
            <p style="color: var(--accent-red); font-style: italic;">
                ⚠️ Capítulo <strong>${chapterId}</strong> ainda não implementado.<br>
                Verifique o arquivo <code>chapters/${chapterId}.js</code>.
            </p>
        `;
        return;
    }

    chapter.start(container);
}
