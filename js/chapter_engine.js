/**
 * chapter_engine.js — Motor compartilhado de capítulos
 *
 * Centraliza a lógica comum a todos os capítulos:
 *   - Navegação de volta ao mapa (goBack)
 *   - Sistema de diálogo linear (step / next / prev)
 *   - Renderização de sidebar com controles
 *   - Renderização de cenas SVG com personagens
 *   - Highlight de personagem falante
 *
 * Uso:
 *   const engine = new ChapterEngine(chapter, container);
 *   engine.start();
 *
 * Depende de: state.js (App), graph.js (renderGraph)
 */

class ChapterEngine {

    /**
     * @param {Object} chapter  — o módulo do capítulo (com title, story, chars, etc.)
     * @param {HTMLElement} container — o div #chapter-ui
     */
    constructor(chapter, container) {
        this.chapter   = chapter;
        this.container = container;
        this._step     = 0;
        this._active   = true;
    }

    // ------------------------------------------------------------------
    // Lifecycle
    // ------------------------------------------------------------------

    /**
     * Inicia o capítulo: renderiza sidebar e, se houver cena, renderiza no SVG.
     */
    start() {
        App.state.currentView    = 'chapter';
        App.state.currentChapter = this.chapter.id || null;

        this._renderSidebar();

        if (this.chapter.chars && this.chapter.background) {
            this._renderScene();
        }
    }

    /**
     * Restaura o painel lateral e o mapa epistêmico.
     * Centralizado aqui para que capítulos NÃO precisem duplicar essa lógica.
     */
    goBack() {
        this._active = false;

        App.state.currentView    = 'map';
        App.state.currentChapter = null;

        document.getElementById('chapter-ui').style.display = 'none';
        document.getElementById('map-ui').style.display     = 'block';

        renderGraph();
    }

    // ------------------------------------------------------------------
    // Sidebar
    // ------------------------------------------------------------------

    /**
     * Renderiza a estrutura da sidebar com caixa de diálogo e controles.
     */
    _renderSidebar() {
        const title = this.chapter.title || 'Capítulo';
        const hasStory = this.chapter.story && this.chapter.story.length > 0;

        this.container.innerHTML = `
            <div class="chapter-dialogue-box">
                <h3 class="chapter-title">${title}</h3>
                <p class="chapter-speaker"></p>
                <p class="chapter-text"></p>
            </div>
            <div class="chapter-controls">
                ${hasStory ? '<button class="btn-chapter-prev btn-choice" style="display:none;">← Anterior</button>' : ''}
                ${hasStory ? '<button class="btn-chapter-next btn-choice">Próximo →</button>' : ''}
                <button class="btn-chapter-back btn-choice">← Voltar ao Mapa</button>
            </div>
        `;

        // Eventos
        const backBtn = this.container.querySelector('.btn-chapter-back');
        if (backBtn) backBtn.addEventListener('click', () => this.goBack());

        if (hasStory) {
            const nextBtn = this.container.querySelector('.btn-chapter-next');
            const prevBtn = this.container.querySelector('.btn-chapter-prev');

            if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());
            if (prevBtn) prevBtn.addEventListener('click', () => this.prevStep());

            // Exibe a primeira fala após a cena carregar (delay para sincronizar com fade)
            setTimeout(() => this.showStep(0), 500);
        } else {
            // Capítulo stub — mostra mensagem de placeholder
            this._showStubMessage();
        }
    }

    /**
     * Exibe mensagem padrão para capítulos ainda não implementados.
     */
    _showStubMessage() {
        const textEl = this.container.querySelector('.chapter-text');
        const speakerEl = this.container.querySelector('.chapter-speaker');
        if (speakerEl) speakerEl.textContent = '';
        if (textEl) {
            textEl.innerHTML = '<em>Cena interativa ainda não implementada.</em>';
        }
    }

    // ------------------------------------------------------------------
    // Sistema de diálogo
    // ------------------------------------------------------------------

    /**
     * Exibe um passo específico do diálogo.
     * @param {number} index — índice no array story
     */
    showStep(index) {
        if (!this._active) return;

        const story = this.chapter.story;
        if (!story || story.length === 0) return;

        this._step = index;

        const speakerEl = this.container.querySelector('.chapter-speaker');
        const textEl    = this.container.querySelector('.chapter-text');
        const nextBtn   = this.container.querySelector('.btn-chapter-next');
        const prevBtn   = this.container.querySelector('.btn-chapter-prev');
        if (!speakerEl || !textEl) return;

        const isFinished = this._step >= story.length;

        if (!isFinished) {
            const fala = story[this._step];
            speakerEl.textContent = fala.speaker;
            textEl.textContent    = fala.text;

            // Highlight do personagem falante na cena SVG
            if (this.chapter.chars) {
                this._highlightSpeaker(fala.speaker);
            }

            // Botão Próximo
            if (nextBtn) {
                nextBtn.textContent   = (this._step < story.length - 1) ? 'Próximo →' : 'Encerrar';
                nextBtn.style.display = '';
            }

            // Botão Anterior
            if (prevBtn) {
                prevBtn.style.display = (this._step > 0) ? '' : 'none';
            }
        } else {
            speakerEl.textContent = '';
            textEl.textContent    = 'Fim do debate.';
            if (this.chapter.chars) this._highlightSpeaker(null);
            if (nextBtn) nextBtn.style.display = 'none';
            if (prevBtn) prevBtn.style.display = 'none';
        }
    }

    /** Avança para o próximo passo do diálogo. */
    nextStep() {
        this._step++;
        this.showStep(this._step);
    }

    /** Volta para o passo anterior do diálogo. */
    prevStep() {
        if (this._step > 0) {
            this._step--;
            this.showStep(this._step);
        }
    }

    // ------------------------------------------------------------------
    // Cena SVG
    // ------------------------------------------------------------------

    /**
     * Realça o personagem que está falando e esmaia os demais.
     * Passa null para remover todos os destaques.
     */
    _highlightSpeaker(speakerName) {
        const { panGroup } = App.state;
        if (!panGroup) return;

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
    }

    /**
     * Troca o conteúdo do panGroup pela cena do capítulo com fade suave.
     */
    async _renderScene() {
        const { panGroup } = App.state;
        if (!panGroup) return;

        // Fade-out do mapa atual
        panGroup.classList.remove('fade-in');
        void panGroup.offsetWidth;
        panGroup.classList.add('fade-out');
        await new Promise(r => setTimeout(r, 400));

        if (!this._active) return;

        // Limpa o panGroup mantendo o rect de captura
        const bgRect = document.getElementById('map-bg-capture');
        panGroup.innerHTML = '';
        panGroup.classList.remove('fade-out');
        if (bgRect) panGroup.appendChild(bgRect);

        // Reset do pan
        App.state.currentPan = { x: 0, y: 0 };
        panGroup.setAttribute('transform', 'translate(0,0)');

        // Plano de fundo
        if (this.chapter.background) {
            this._addImage(panGroup, this.chapter.background, 0, 0, 1000, 800);
        }

        // Personagens
        if (this.chapter.chars) {
            Object.entries(this.chapter.chars).forEach(([name, info]) => {
                const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                g.classList.add('char-instance', `char-${name.toLowerCase()}`);
                this._addImage(g, `imgs/${info.file}`, info.x, info.y, info.width, info.height);
                panGroup.appendChild(g);
            });
        }

        // Fade-in da cena
        void panGroup.offsetWidth;
        panGroup.classList.add('fade-in');
    }

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
    }
}
