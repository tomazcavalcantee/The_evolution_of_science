/**
 * chapters/_template.js — Template para novos capítulos
 *
 * ============================================================
 * COMO CRIAR UM NOVO CAPÍTULO (passo a passo):
 * ============================================================
 *
 * 1. Copie este arquivo para `chapters/cap_meu_tema.js`
 *    (o nome deve ser igual ao `chapterId` em gameData.edges).
 *
 * 2. Substitua "cap_meu_tema" por seu chapterId real (em 3 lugares).
 *
 * 3. Preencha `title`, e opcionalmente `background`, `chars` e `story`.
 *    - Se `story` estiver presente, o ChapterEngine cuida do diálogo.
 *    - Se `chars` e `background` estiverem presentes, o ChapterEngine
 *      renderiza a cena SVG com fade e highlight de personagem.
 *    - Se nenhum dos dois estiver presente, mostra um stub "não implementado".
 *
 * 4. Adicione o <script> em index.html ANTES de graph.js.
 *
 * 5. Em data.js, adicione uma aresta com `chapterId: "cap_meu_tema"`.
 *
 * 6. Atualize chapters.json com os metadados do capítulo.
 * ============================================================
 *
 * Exemplo mínimo (stub):
 *
 *   App.registerChapter("cap_meu_tema", {
 *       id: "cap_meu_tema",
 *       title: "Título do Debate",
 *       start(container) {
 *           this.engine = new ChapterEngine(this, container);
 *           this.engine.start();
 *       },
 *   });
 *
 * Exemplo com diálogo e cena:
 *
 *   App.registerChapter("cap_meu_tema", {
 *       id: "cap_meu_tema",
 *       title: "Título do Debate",
 *       background: "imgs/meu_cenario.svg",
 *       chars: {
 *           "Filósofo A": { x: 100, y: 500, width: 200, height: 250, file: "a.svg" },
 *           "Filósofo B": { x: 600, y: 500, width: 200, height: 250, file: "b.svg" },
 *       },
 *       story: [
 *           { speaker: "Filósofo A", text: "Primeira fala..." },
 *           { speaker: "Filósofo B", text: "Resposta..." },
 *       ],
 *       start(container) {
 *           this.engine = new ChapterEngine(this, container);
 *           this.engine.start();
 *       },
 *   });
 */

App.registerChapter("cap_meu_tema", {
    id: "cap_meu_tema",
    title: "Título do Debate",

    // Descomente e preencha para adicionar cena SVG:
    // background: "imgs/cenario.svg",
    // chars: {
    //     "Filósofo A": { x: 100, y: 500, width: 200, height: 250, file: "a.svg" },
    //     "Filósofo B": { x: 600, y: 500, width: 200, height: 250, file: "b.svg" },
    // },

    // Descomente e preencha para adicionar diálogo:
    // story: [
    //     { speaker: "Filósofo A", text: "Primeira fala..." },
    //     { speaker: "Filósofo B", text: "Resposta..." },
    // ],

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});