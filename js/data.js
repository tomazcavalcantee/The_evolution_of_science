/**
 * data.js — Fonte da verdade do mapa epistêmico
 *
 * PARA COLABORADORES:
 *   - Para adicionar um filósofo: insira um objeto em `gameData.nodes`.
 *   - Para adicionar uma disputa: insira um objeto em `gameData.edges`
 *     e crie o arquivo correspondente em `chapters/`.
 *   - As coordenadas x/y são relativas ao viewBox 1000×800 do SVG.
 *   - Os `chapterId` devem ser únicos e corresponder ao nome do arquivo
 *     em `chapters/` e à entrada em `chapters.json`.
 */


// ------------------------------------------------------------------
// Ícones SVG inline
// IMPORTANTE: deve vir ANTES de gameData, pois é referenciado nas arestas.
// ------------------------------------------------------------------

/**
 * Ícones SVG inline usados nos botões de ação das arestas.
 *
 * PARA COLABORADORES:
 *   Ao adicionar uma nova aresta, adicione seu ícone aqui e referencie
 *   como `icon: Icons.meu_icone` no objeto da aresta em gameData.edges.
 */
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

    revolucoes: `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 2 22 22 22"/>
        <path d="m2 22 10-10"/>
        <path d="m12 12 10 10"/>
    </svg>`,
};


// ------------------------------------------------------------------
// Dados do mapa
// ------------------------------------------------------------------

const gameData = {

    // Texto de introdução exibido sempre no painel lateral
    intro: [
        "Quais discussões protagonizaram os séculos de estudo sobre o conhecimento? E como os diferentes pontos de vista encaram diferentes problemas?",
        "<strong>Explore o mapa ao lado.</strong> Você pode arrastar os filósofos para organizá-los ou arrastar o fundo do mapa.",
        "Clique nas linhas de conexão para revelar as disputas históricas.",
    ],

    // Nós — cada filósofo/corrente no mapa
    nodes: [
        { id: "thagard",     label: "Paul Thagard",  x: 150, y: 150, color: "#27ae60", imgUrl: "../img/bacon.svg" },
        { id: "popper",      label: "Karl Popper",   x: 850, y: 150, color: "#d35400", imgUrl: "../img/bacon.svg" },
        { id: "kuhn",        label: "Thomas Kuhn",   x: 500, y: 400, color: "#7f8c8d", imgUrl: "../img/bacon.svg" },
        // { id: "indutivista", label: "Indutivismo",   x: 150, y: 700, color: "var(--indutivista-color)" },
        { id: "empiricista", label: "Empiricismo",   x: 850, y: 700, color: "var(--empiricista-color)", imgUrl: "../img/hume.svg" },
        { id: "bacon", label: "Indutivismo",   x: 150, y: 700, color: "var(--indutivista-color)", imgUrl: "../img/bacon.svg" },
    ],

    // Arestas — cada disputa filosófica entre dois nós
    edges: [
        {
            id: "edge_demarcacao",
            source: "thagard",
            target: "popper",
            title: "O Problema da Demarcação",
            desc: "O que separa a Ciência real da Pseudociência? Popper propõe a falseabilidade (a ciência deve poder ser provada errada). Thagard argumenta que devemos olhar para critérios sociais e históricos, usando a Astrologia como exemplo.",
            chapterId: "cap_demarcacao",
            icon: Icons.demarcacao,
        },
        {
            id: "edge_peru",
            source: "bacon",
            target: "empiricista",
            title: "O Peru de Russell",
            desc: "Se a ciência é baseada na indução (observar que o Sol nasce todo dia), quão seguros estamos do futuro? Russell ilustra com um peru que, após ser alimentado todo dia às 9h, conclui que isso é uma lei universal... até a véspera de Natal.",
            chapterId: "cap_peru",
            icon: Icons.peru,
        },
        {
            id: "edge_paradigmas",
            source: "popper",
            target: "kuhn",
            title: "Revoluções Científicas",
            desc: "A ciência progride pelo acúmulo linear de erros refutados (Popper) ou por saltos abruptos de paradigmas (Kuhn)? Para Kuhn, quando as anomalias se acumulam, a 'lente' do mundo quebra e é substituída por uma nova.",
            chapterId: "cap_revolucoes",
            icon: Icons.revolucoes,
        },
    ],
};
