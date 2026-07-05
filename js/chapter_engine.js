/**
 * chapter_engine.js — Motor compartilhado de capítulos
 *
 * Centraliza a lógica comum a todos os capítulos:
 *   - Navegação de volta ao mapa (goBack)
 *   - Sistema de diálogo com árvore de ramificação (escolhas do jogador)
 *   - Renderização de sidebar com controles dinâmicos
 *   - Renderização de cenas SVG com personagens
 *   - Highlight de personagem falante
 *   - Exibição de veredictos com título em destaque
 *
 * Estrutura de dados suportada:
 *   story: [
 *     { speaker, text },                          // fala linear
 *     { speaker: "Narrador", text, options: [...] }, // ponto de escolha
 *     { id: "x", story: [...] }                   // ramo de escolha
 *   ]
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

        // Pilha para navegação em ramificações.
        // Cada entrada: { story: Array, step: number }
        this._branchStack  = [];

        // A story ativa no momento (começa como a raiz do capítulo)
        this._currentStory = this.chapter.story || [];
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

        // Esconde a legenda do mapa durante o capítulo
        const svg = document.getElementById('graph-container');
        if (svg) {
            const legend = svg.querySelector('.legend-group');
            if (legend) legend.style.display = 'none';
        }

        if (this.chapter.chars || this.chapter.background) {
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

        // Reexibe a legenda do mapa
        const svg = document.getElementById('graph-container');
        if (svg) {
            const legend = svg.querySelector('.legend-group');
            if (legend) legend.style.display = '';
        }

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
        const hasStory = this._currentStory && this._currentStory.length > 0;

        this.container.innerHTML = `
            <div class="chapter-dialogue-box">
                <h3 class="chapter-title">${title}</h3>
                <p class="chapter-speaker"></p>
                <p class="chapter-text"></p>
            </div>
            <div class="chapter-controls"></div>
        `;

        if (hasStory) {
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
        // Mostra apenas o botão de voltar
        this._renderBackOnlyControls();
    }

    // ------------------------------------------------------------------
    // Utilitários de story
    // ------------------------------------------------------------------

    /**
     * Filtra apenas os passos de diálogo (exclui entradas de ramificação {id, story}).
     * Passos de diálogo: objetos que têm 'speaker' e 'text'.
     * @param {Array} storyArray — o array story a filtrar
     * @returns {Array} — somente os passos que são falas ou pontos de escolha
     */
    _getDialogueSteps(storyArray) {
        if (!storyArray) return [];
        return storyArray.filter(entry => entry.speaker !== undefined);
    }

    /**
     * Verifica se um passo é um ponto de escolha (possui array options).
     * @param {Object} step — o passo atual
     * @returns {boolean}
     */
    _isChoicePoint(step) {
        return step && Array.isArray(step.options) && step.options.length > 0;
    }

    /**
     * Verifica se um passo é um veredicto final.
     * @param {Object} step — o passo atual
     * @returns {boolean}
     */
    _isVerdict(step) {
        return step && step.speaker === 'Verredito';
    }

    /**
     * Encontra o ramo correspondente a uma escolha dentro do array options.
     * Os ramos são entradas com { id, story: [...] } (sem title/description).
     * @param {Array} options — o array options do ponto de escolha
     * @param {string} choiceId — o id selecionado pelo jogador
     * @returns {Object|null} — o ramo encontrado ou null
     */
    _findBranch(options, choiceId) {
        return options.find(
            opt => opt.id === choiceId && Array.isArray(opt.story)
        ) || null;
    }

    /**
     * Extrai os botões de opção de um array options.
     * São as entradas que possuem 'title' e 'description' (sem story).
     * @param {Array} options — o array options do ponto de escolha
     * @returns {Array} — as opções clicáveis
     */
    _getOptionButtons(options) {
        return options.filter(opt => opt.title !== undefined && !Array.isArray(opt.story));
    }

    // ------------------------------------------------------------------
    // Sistema de diálogo com ramificação
    // ------------------------------------------------------------------

    /**
     * Exibe um passo específico do diálogo na story ativa.
     * Lida com falas normais, pontos de escolha e veredictos.
     * @param {number} index — índice nos passos de diálogo da story ativa
     */
    showStep(index) {
        if (!this._active) return;

        // Obtém apenas os passos de diálogo (sem entradas de ramo)
        const dialogueSteps = this._getDialogueSteps(this._currentStory);
        if (!dialogueSteps || dialogueSteps.length === 0) return;

        this._step = index;

        const speakerEl = this.container.querySelector('.chapter-speaker');
        const textEl    = this.container.querySelector('.chapter-text');
        if (!speakerEl || !textEl) return;

        const isFinished = this._step >= dialogueSteps.length;

        if (isFinished) {
            // Fim do ramo atual
            speakerEl.textContent = '';
            textEl.textContent    = 'Fim do debate.';
            if (this.chapter.chars) this._highlightSpeaker(null);
            this._renderBackOnlyControls();
            return;
        }

        const fala = dialogueSteps[this._step];

        // --- Veredicto ---
        if (this._isVerdict(fala)) {
            this._showVerdict(fala);
            return;
        }

        // --- Ponto de escolha ---
        if (this._isChoicePoint(fala)) {
            speakerEl.textContent = fala.speaker;
            textEl.textContent    = fala.text;

            // Highlight do narrador na cena
            if (this.chapter.chars) {
                this._highlightSpeaker(fala.speaker);
            }

            // Renderiza os botões de escolha
            this._renderChoiceControls(fala.options);
            return;
        }

        // --- Fala normal ---
        speakerEl.textContent = fala.speaker;
        textEl.textContent    = fala.text;

        // Highlight do personagem falante na cena SVG
        if (this.chapter.chars) {
            this._highlightSpeaker(fala.speaker);
        }

        // Renderiza controles de navegação linear
        this._renderLinearControls(dialogueSteps);
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
    // Renderização de controles
    // ------------------------------------------------------------------

    /**
     * Renderiza os botões de navegação linear (← Anterior / Próximo →).
     * @param {Array} dialogueSteps — passos filtrados da story ativa
     */
    _renderLinearControls(dialogueSteps) {
        const controls = this.container.querySelector('.chapter-controls');
        if (!controls) return;

        const isLast = this._step >= dialogueSteps.length - 1;

        controls.innerHTML = '';

        // Botão Anterior (oculto no primeiro passo, exceto se veio de uma branch)
        if (this._step > 0) {
            const prevBtn = document.createElement('button');
            prevBtn.className   = 'btn-choice';
            prevBtn.textContent = '← Anterior';
            prevBtn.addEventListener('click', () => this.prevStep());
            controls.appendChild(prevBtn);
        }

        // Botão Próximo / Encerrar
        const nextBtn = document.createElement('button');
        nextBtn.className   = 'btn-choice';
        nextBtn.textContent = isLast ? 'Encerrar' : 'Próximo →';
        nextBtn.addEventListener('click', () => this.nextStep());
        controls.appendChild(nextBtn);

        // Botão Voltar ao Mapa
        const backBtn = document.createElement('button');
        backBtn.className   = 'btn-choice';
        backBtn.textContent = '← Voltar ao Mapa';
        backBtn.addEventListener('click', () => this.goBack());
        controls.appendChild(backBtn);
    }

    /**
     * Renderiza os botões de escolha em um ponto de ramificação.
     * Esconde os controles lineares e exibe as opções com título e descrição.
     * @param {Array} options — o array options do ponto de escolha
     */
    _renderChoiceControls(options) {
        const controls = this.container.querySelector('.chapter-controls');
        if (!controls) return;

        controls.innerHTML = '';

        // Extrai as opções clicáveis (com title e description)
        const buttons = this._getOptionButtons(options);

        buttons.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-choice btn-choice-option';

            // Conteúdo do botão: título em negrito + descrição abaixo
            btn.innerHTML = `
                <span class="btn-choice-title">${opt.title}</span>
                <span class="btn-choice-desc">${opt.description}</span>
            `;

            btn.addEventListener('click', () => this._selectChoice(options, opt.id));
            controls.appendChild(btn);
        });

        // Botão Voltar ao Mapa (sempre presente)
        const backBtn = document.createElement('button');
        backBtn.className   = 'btn-choice';
        backBtn.textContent = '← Voltar ao Mapa';
        backBtn.addEventListener('click', () => this.goBack());
        controls.appendChild(backBtn);
    }

    /**
     * Renderiza apenas o botão de voltar ao mapa (para veredictos e fim de ramo).
     */
    _renderBackOnlyControls() {
        const controls = this.container.querySelector('.chapter-controls');
        if (!controls) return;

        controls.innerHTML = '';

        const backBtn = document.createElement('button');
        backBtn.className   = 'btn-choice';
        backBtn.textContent = '← Voltar ao Mapa';
        backBtn.addEventListener('click', () => this.goBack());
        controls.appendChild(backBtn);
    }

    // ------------------------------------------------------------------
    // Lógica de ramificação
    // ------------------------------------------------------------------

    /**
     * Processa a seleção de uma escolha pelo jogador.
     * Empilha o estado atual e entra no ramo selecionado.
     * @param {Array} options — o array options do ponto de escolha
     * @param {string} choiceId — o id da opção escolhida
     */
    _selectChoice(options, choiceId) {
        // Encontra o ramo correspondente
        const branch = this._findBranch(options, choiceId);
        if (!branch || !branch.story) return;

        // Empilha o estado atual para possível navegação futura
        this._branchStack.push({
            story: this._currentStory,
            step:  this._step
        });

        // Entra no novo ramo
        this._currentStory = branch.story;
        this._step = 0;

        // Exibe o primeiro passo do ramo
        this.showStep(0);
    }

    // ------------------------------------------------------------------
    // Exibição de veredicto
    // ------------------------------------------------------------------

    /**
     * Exibe um veredicto final com título em destaque e texto explicativo.
     * Após o veredicto, mostra apenas o botão de voltar.
     * @param {Object} fala — a entrada de veredicto { speaker: "Verredito", title, text }
     */
    _showVerdict(fala) {
        const speakerEl = this.container.querySelector('.chapter-speaker');
        const textEl    = this.container.querySelector('.chapter-text');
        if (!speakerEl || !textEl) return;

        // Título do veredicto em destaque
        speakerEl.innerHTML = `<span class="verdict-label">Veredicto</span>`;
        textEl.innerHTML = `
            <strong class="verdict-title">${fala.title}</strong>
            <br><br>
            ${fala.text}
        `;

        // Remove highlight de personagens (veredicto é narrado)
        if (this.chapter.chars) {
            this._highlightSpeaker(null);
        }

        // Mostra apenas o botão de voltar ao mapa
        this._renderBackOnlyControls();
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
            g.style.opacity = speakerName ? '0.4' : '1';
            g.style.filter  = speakerName ? 'grayscale(50%)' : 'none';
        });

        if (speakerName) {
            const safeName = speakerName.toLowerCase().replace(/[^a-z0-9]/g, '');
            const active = panGroup.querySelector(`.char-${safeName}`);
            if (active) {
                active.style.opacity = '1';
                active.style.filter  = 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9)) brightness(1.15)';
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
            this._addImage(panGroup, this.chapter.background, 0, 0, 1000, 800, 'none');
        }

        // Personagens
        if (this.chapter.chars) {
            Object.entries(this.chapter.chars).forEach(([name, info]) => {
                const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
                g.classList.add('char-instance', `char-${safeName}`);
                this._addImage(g, `imgs/${info.file}`, info.x, info.y, info.width, info.height);
                panGroup.appendChild(g);
            });
        }

        // Fade-in da cena
        void panGroup.offsetWidth;
        panGroup.classList.add('fade-in');
    }

    /** Cria e insere um <image> SVG no elemento pai. */
    _addImage(parent, href, x, y, width, height, preserve = 'xMidYMid meet') {
        const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
        img.setAttributeNS(null, 'href',                href);
        img.setAttributeNS(null, 'x',                   x);
        img.setAttributeNS(null, 'y',                   y);
        img.setAttributeNS(null, 'width',               width);
        img.setAttributeNS(null, 'height',              height);
        img.setAttributeNS(null, 'preserveAspectRatio', preserve);
        parent.appendChild(img);
    }
}
