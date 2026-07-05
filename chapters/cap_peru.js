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
        { speaker: "Narrador", text: "Você é um fazendeiro que alimenta seu peru pontualmente às 9h da manhã por 100 dias seguidos. Como bom indutivista, o peru tem certeza absoluta de que sempre será alimentado. Mas amanhã é véspera de Natal." },
        { speaker: "Narrador", text: "Você mata o peru para a ceia ou continua o alimentando?", options: [
            { id: "a", title: "Alimentá-lo Mais um Dia", description: "Poupar o peru e manter a rotina de alimentação." },
            { id: "b", title: "Matar o Peru", description: "Quebrar o ciclo e preparar o jantar de Natal." },
            { id: "a", story: [
                { speaker: "Bacon", text: "Excelente! Você manteve a rotina. A expectativa do peru, baseada em 100 dias de observação empírica, provou-se correta. O método indutivo funciona!" },
                { speaker: "Hume", text: "Funcionou hoje por pura sorte! Acertar por acaso não valida a premissa de que o passado pode garantir o futuro." },
                { speaker: "Bacon", text: "Chame de sorte, eu chamo de probabilidade! A ciência acumula fatos para nos guiar na prática, e hoje o peru sobreviveu." },
                { speaker: "Hume", text: "Até o dia em que ele virar o jantar. O salto lógico do 'sempre foi assim' para o 'sempre será' continua sendo irracional." }
            ]},
            { id: "b", story: [
                { speaker: "Hume", text: "Eu avisei! O peru tinha certeza de que seria alimentado só porque foi nos últimos 100 dias. Prova definitiva de que o passado não garante o futuro!" },
                { speaker: "Bacon", text: "O peru não falhou por usar indução, falhou por ter dados incompletos! Se ele tivesse observado os Natais anteriores, a indução o teria salvado." },
                { speaker: "Hume", text: "A sua resposta para salvar a indução é... usar mais indução? Que ironia. O peru morreu e sua teoria empírica foi para a panela." },
                { speaker: "Bacon", text: "Mesmo na panela, nós aprendemos com o erro dele. A ciência avança refinando dados, não desistindo diante do primeiro ceticismo." }
            ]}
        ]}
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