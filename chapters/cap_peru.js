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
 *
 * Usa ChapterEngine para toda a infraestrutura (diálogo, navegação, cena).
 */

App.registerChapter("cap_peru", {

    id: "cap_peru",
    title: "Peru Indutivista",
    background: "imgs/cenario.svg",

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
        { speaker: "Bacon", text: "A experiência é a única base segura para a verdade." },
        { speaker: "Hume",  text: "Mas o ontem jamais dita o amanhã." },
    ],

    // ------------------------------------------------------------------
    // Ponto de entrada — chamado por story.js
    // ------------------------------------------------------------------

    /**
     * @param {HTMLElement} container — o div #chapter-ui do painel lateral
     */
    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});