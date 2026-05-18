/**
 * cap_peru.js — O Peru de Russell (Bacon vs. Hume)
 *
 * Implementação baseada no trabalho de [amigo], integrada à arquitetura do projeto.
 *
 * O capítulo ocupa DUAS áreas ao mesmo tempo:
 *   • SVG (#graph-container / panGroup) → cena visual: cenário + personagens
 *   • Sidebar (#chapter-ui / container)  → diálogo + botões de controle
 *
 * Assets necessários em imgs/ (já incluídos no projeto):
 *   cenario.svg, bacon.svg, peru.svg, hume.svg
 */

App.registerChapter("cap_peru", {

    // ------------------------------------------------------------------
    // Dados do capítulo
    // ------------------------------------------------------------------

    // Posições e arquivos dos personagens no SVG
    chars: {
        "Bacon": { x: 80,  y: 500, width: 220, height: 250, file: "bacon.svg" },
        "Peru":  { x: 330, y: 430, width: 310, height: 220, file: "peru.svg"  },
        "Hume":  { x: 650, y: 500, width: 240, height: 270, file: "hume.svg"  },
    },

    // Roteiro — cada entrada é uma fala exibida no painel lateral
    story: [
        { speaker: "Bacon", text: "Sábia decisão, jogador. Você escolheu o caminho da prática e da observação." },
        { speaker: "Hume",  text: "Sua fé na constância é quase tocante, Bacon." },
        { speaker: "Bacon",  text: "A experiência é a única base segura para a verdade." },
        { speaker: "Hume",  text: "Mas o ontem jamais dita o amanhã." },
    ],

    // ------------------------------------------------------------------
    // Ponto de entrada — chamado por story.js
    // ------------------------------------------------------------------

    /**
     * @param {HTMLElement} container — o div #chapter-ui do painel lateral
     */
    start(container) {
        this._container = container;
        this._step = 0;
        this._active = true; // guard para evitar ações após goBack()

        this._renderSidebar();
        this._renderScene();   // async — prepara a cena no SVG
    },

    // ------------------------------------------------------------------
    // Sidebar (painel lateral)
    // ------------------------------------------------------------------

    _renderSidebar() {
        this._container.innerHTML = `
            <div id="peru-dialogue-box">
                <p id="peru-speaker" class="chapter-speaker"></p>
                <p id="peru-text"    class="chapter-text"></p>
            </div>
            <div class="chapter-controls">
                <button id="btn-peru-next" class="btn-choice">Próximo →</button>
                <button id="btn-peru-back" class="btn-choice">← Voltar ao Mapa</button>
            </div>
        `;

        document.getElementById('btn-peru-next')
            .addEventListener('click', () => this._nextStep());
        document.getElementById('btn-peru-back')
            .addEventListener('click', () => this._goBack());

        // Exibe a primeira fala após a cena carregar (500ms de margem)
        setTimeout(() => this._showCurrentStep(), 500);
    },

    _showCurrentStep() {
        if (!this._active) return;

        const speakerEl = document.getElementById('peru-speaker');
        const textEl    = document.getElementById('peru-text');
        const nextBtn   = document.getElementById('btn-peru-next');
        if (!speakerEl || !textEl) return;

        const isLastStep = this._step >= this.story.length;

        if (!isLastStep) {
            const fala = this.story[this._step];
            speakerEl.textContent = fala.speaker;
            textEl.textContent    = fala.text;
            this._highlightSpeaker(fala.speaker);
            if (nextBtn) {
                nextBtn.textContent    = (this._step < this.story.length - 1) ? 'Próximo →' : 'Encerrar';
                nextBtn.style.display  = '';
            }
        } else {
            speakerEl.textContent = '';
            textEl.textContent    = 'Fim do debate.';
            this._highlightSpeaker(null); // apaga todos os destaques
            if (nextBtn) nextBtn.style.display = 'none';
        }
    },

    _nextStep() {
        this._step++;
        this._showCurrentStep();
    },

    _goBack() {
        this._active = false;

        document.getElementById('chapter-ui').style.display = 'none';
        document.getElementById('map-ui').style.display     = 'block';

        // Restaura o mapa epistêmico no SVG
        renderGraph();
    },

    // ------------------------------------------------------------------
    // Cena SVG
    // ------------------------------------------------------------------

    /**
     * Realça o personagem que está falando e esmaia os demais.
     * Passa null para remover todos os destaques.
     */
    _highlightSpeaker(speakerName) {
        const { panGroup } = App.state;
        panGroup.querySelectorAll('.char-instance').forEach(g => {
            g.style.opacity = speakerName ? '0.70' : '1';
            g.style.filter  = '';
        });
        if (speakerName) {
            const active = panGroup.querySelector(`.char-${speakerName.toLowerCase()}`);
            if (active) {
                active.style.opacity = '1';
                active.style.filter  = 'drop-shadow(0 0 10px rgba(255,210,80,0.85))';
            }
        }
    },

    /**
     * Troca o conteúdo do panGroup pela cena da fazenda com fade suave.
     */
    async _renderScene() {
        const { panGroup } = App.state;

        // Fade-out do mapa atual
        panGroup.classList.remove('fade-in');
        void panGroup.offsetWidth;
        panGroup.classList.add('fade-out');
        await new Promise(r => setTimeout(r, 400));

        if (!this._active) return; // usuário já voltou durante o fade

        // Limpa o panGroup mantendo o rect invisível de captura de cliques
        const bgRect = document.getElementById('map-bg-capture');
        panGroup.innerHTML = '';
        panGroup.classList.remove('fade-out');
        if (bgRect) panGroup.appendChild(bgRect);

        // Reinicia o pan para (0,0) para a cena aparecer centralizada
        App.state.currentPan = { x: 0, y: 0 };
        panGroup.setAttribute('transform', 'translate(0,0)');

        // Plano de fundo
        this._addImage(panGroup, 'imgs/cenario.svg', 0, 0, 1000, 800);

        // Personagens
        Object.entries(this.chars).forEach(([name, info]) => {
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.classList.add('char-instance', `char-${name.toLowerCase()}`);
            this._addImage(g, `imgs/${info.file}`, info.x, info.y, info.width, info.height);
            panGroup.appendChild(g);
        });

        // Fade-in da cena
        void panGroup.offsetWidth;
        panGroup.classList.add('fade-in');
    },

    /** Cria e insere um <image> SVG no elemento pai. */
    _addImage(parent, href, x, y, width, height) {
        const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
        img.setAttributeNS(null, 'href',                href);
        img.setAttributeNS(null, 'x',                   x);
        img.setAttributeNS(null, 'y',                   y);
        img.setAttributeNS(null, 'width',               width);
        img.setAttributeNS(null, 'height',              height);
        img.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
        parent.appendChild(img);
    },
});