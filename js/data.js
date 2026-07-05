/**
 * data.js — Fonte da verdade do mapa epistêmico
 *
 *   - Filósofos → gameData.nodes
 *   - Classes de debate → gameData.debateClasses
 *   - Arestas → gameData.edges  (referenciam um debateClassId)
 *   - Ícones SVG → objeto Icons (declarado antes de gameData)
 *
 *   Entre dois filósofos pode haver MAIS DE UMA aresta, desde que
 *   pertençam a debateClasses diferentes. O motor cuida do visual.
 */


// ------------------------------------------------------------------
// Ícones SVG inline
// ------------------------------------------------------------------
const Icons = {

    demarcacao: `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>`,

    peru: `<svg class="btn-icon turkey-svg" viewBox="0 0 100 100" fill="none"
        xmlns="http://www.w3.org/2000/svg" stroke="#2c1e16" stroke-width="6"
        stroke-linecap="round" stroke-linejoin="round">
        <g class="turkey-body-group">
            <path d="M 40 85 L 40 95 L 32 95 M 65 85 L 65 95 L 73 95"/>
            <path d="M 12 70 Q -5 45 35 25 L 65 25 Q 105 45 88 70 Z" fill="#b97a57"/>
            <g fill="#5776b9" stroke-width="4">
                <ellipse cx="25" cy="40" rx="8" ry="12"/>
                <ellipse cx="38" cy="30" rx="6" ry="12"/>
                <ellipse cx="62" cy="30" rx="6" ry="12"/>
                <ellipse cx="75" cy="40" rx="8" ry="12"/>
            </g>
            <circle cx="52.5" cy="70" r="22" fill="#b97a57"/>
        </g>
        <g class="turkey-head-group">
            <path d="M 40 55 C 20 40 10 30 25 15 C 35 5 45 15 50 30 C 52.5 45 45 55 40 55 Z" fill="#fdf6e3"/>
            <circle cx="28" cy="22" r="3" fill="#2c1e16" stroke="none"/>
            <path d="M 24 28 L 10 32 L 24 36 Z" fill="#f1c40f" stroke-linejoin="round"/>
            <path class="turkey-wattle" d="M 22 34 L 14 55 Q 20 60 26 50" fill="#8e0000" stroke-linecap="round"/>
        </g>
    </svg>`,

    conhecimento: `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    
    metodo: `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
    
    observacao: `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
};


// ------------------------------------------------------------------
// Dados do mapa
// ------------------------------------------------------------------
const gameData = {

    // Texto de introdução no painel lateral
    intro: [
        "Quais discussões protagonizaram os séculos de estudo sobre o conhecimento? E como os diferentes pontos de vista encaram diferentes problemas?",
        "<strong>Explore o mapa abaixo:</strong> Arraste os filósofos para reorganizá-los ou arraste o fundo para navegar pelo papiro.",
        "As linhas de conexão representam <strong>classes de debate</strong> — confira a legenda no mapa. Clique em uma linha para revelar a disputa.",
    ],

    // ------------------------------------------------------------------
    // Nós
    // ------------------------------------------------------------------
    /**
     * @typedef {Object} NodeData
     * @property {string} id
     * @property {string} label
     * @property {number} x      - Posição inicial X (viewBox 0–1000)
     * @property {number} y      - Posição inicial Y (viewBox 0–800)
     * @property {string} color  - Cor do bonequinho (hex ou var CSS)
     */
    nodes: [
        { id: "thagard",     label: "Paul Thagard",   x: 150, y: 150, color: "#27ae60" },
        { id: "popper",      label: "Karl Popper",    x: 800, y: 150, color: "#d35400" },
        { id: "kuhn",        label: "Thomas Kuhn",    x: 500, y: 450, color: "#7f8c8d" },
        { id: "lakatos",     label: "Imre Lakatos",   x: 800, y: 350, color: "#16a085", img: "imgs/lak_piece_0.png" },
        { id: "bacon",       label: "Francis Bacon",  x: 150, y: 680, color: "var(--indutivista-color)",    img: "imgs/bacon.svg" },
        { id: "hume",        label: "David Hume",     x: 500, y: 550, color: "var(--empiricista-color)",    img: "imgs/hume.svg" },
    ],

    // ------------------------------------------------------------------
    // Classes de debate
    // ------------------------------------------------------------------
    /**
     * @typedef {Object} DebateClass
     * @property {string} id      - Chave única; usada em edges.debateClassId
     * @property {string} label   - Nome exibido na legenda e no painel
     * @property {string} color   - Cor das arestas desta classe (hex)
     * @property {string} icon    - SVG inline para o botão de ação
     * @property {string} desc    - Descrição geral da classe (exibida no painel)
     *
     */
    debateClasses: [
        {
            id: "demarcacao",
            label: "Problema da Demarcação",
            color: "#8e0000",
            icon: Icons.demarcacao,
            desc: "O que separa a ciência legítima da pseudociência?",
        },
        {
            id: "inducao",
            label: "Problema da Indução",
            color: "#1a5276",
            icon: Icons.peru,
            desc: "Com base em observações passadas, podemos concluir algo sobre o futuro?",
        },
        {
            id: "evolucao_ciencia",
            label: "Evolução da Ciência",
            color: "#6e4216", // Cor baseada na paleta do site (wood/brown)
            icon: Icons.metodo,
            desc: "Como a ciência progride e substitui suas teorias ao longo do tempo?",
        },
    ],

    // ------------------------------------------------------------------
    // Arestas
    // ------------------------------------------------------------------
    /**
     * @typedef {Object} EdgeData
     * @property {string} id            - ID único do elemento SVG
     * @property {string} source        - id do nó de origem
     * @property {string} target        - id do nó de destino
     * @property {string} debateClassId - id da classe em gameData.debateClasses
     * @property {string} title         - Título específico desta disputa
     * @property {string} desc          - Descrição desta disputa (painel lateral)
     * @property {string} chapterId     - Capítulo lançado ao clicar "Iniciar Debate"
     *
     */
    edges: [
        {
            id: "edge_demarcacao_thagard_popper",
            source: "thagard",
            target: "popper",
            debateClassId: "demarcacao",
            title: "Critérios de Demarcação",
            desc: "Popper defende a falseabilidade como critério único. Thagard contra-argumenta que a demarcação exige critérios históricos e sociais — e usa a Astrologia como caso de teste.",
            chapterId: "cap_demarcacao",
        },
        {
            id: "edge_demarcacao_popper_kuhn",
            source: "popper",
            target: "kuhn",
            debateClassId: "evolucao_ciencia",
            title: "Demarcação e Anomalias",
            desc: "Para Popper, uma teoria refutada deve ser descartada. Kuhn discorda: cientistas normalmente ignoram anomalias e só trocam de paradigma quando a pressão se torna insustentável.",
            chapterId: "cap_demarcacao_kuhn",
        },

        {
            id: "edge_inducao_ind_emp",
            source: "bacon",
            target: "hume",
            debateClassId: "inducao",
            title: "Peru Indutivista",
            desc: "Se a ciência é baseada em indução, quão seguros estamos do futuro? Russell ilustra com um peru alimentado todo dia às 9h que conclui tratar-se de uma lei universal... até a véspera de Natal.",
            chapterId: "cap_peru",
        },

        {
            id: "edge_evolucao_popper_lakatos",
            source: "popper",
            target: "lakatos",
            debateClassId: "evolucao_ciencia",
            title: "Programas de Pesquisa",
            desc: "Lakatos propõe os Programas de Pesquisa Científica como uma síntese entre o falsificacionismo de Popper e os paradigmas de Kuhn, diferenciando um núcleo firme e um cinturão protetor de hipóteses.",
            chapterId: "cap_lakatos",
        },

        {
            id: "edge_evolucao_kuhn_lakatos",
            source: "kuhn",
            target: "lakatos",
            debateClassId: "evolucao_ciencia",
            title: "Paradigmas vs Programas de Pesquisa",
            desc: "Enquanto Kuhn foca nas mudanças de paradigma como revoluções, Lakatos argumenta que há uma escolha racional entre Programas de Pesquisa concorrentes baseada no seu poder heurístico.",
            chapterId: "cap_kuhn_lakatos",
        },
    ],
};