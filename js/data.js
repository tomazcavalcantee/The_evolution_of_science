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
    // Flask: Ciência vs Pseudociência
    demarcacao: `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 2v7.31L2.07 19.24A2 2 0 0 0 3.75 22h16.5a2 2 0 0 0 1.68-2.76L14 9.31V2"/>
        <line x1="8.5" y1="2" x2="15.5" y2="2"/>
        <line x1="6" y1="14" x2="18" y2="14"/>
    </svg>`,

    // Feather: O Peru Indutivista
    peru: `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
        <line x1="16" y1="8" x2="2" y2="22"/>
        <line x1="17.5" y1="15" x2="9" y2="6.5"/>
    </svg>`,

    // Branch: Evolução da Ciência (Mudanças de paradigma)
    evolucao: `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="6" y1="3" x2="6" y2="15"/>
        <circle cx="18" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <path d="M18 9a9 9 0 0 1-9 9"/>
    </svg>`
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
        { id: "thagard",     label: "Paul Thagard",   x: 150, y: 150, color: "#27ae60",                   img: "imgs/thagard.svg" },
        { id: "popper",      label: "Karl Popper",    x: 800, y: 150, color: "#d35400",                   img: "imgs/popper.svg" },
        { id: "kuhn",        label: "Thomas Kuhn",    x: 500, y: 450, color: "#7f8c8d",                   img: "imgs/kuhn.svg"},
        { id: "lakatos",     label: "Imre Lakatos",   x: 800, y: 350, color: "#16a085",                   img: "imgs/lakatos-brown.svg  " },
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
            icon: Icons.evolucao,
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