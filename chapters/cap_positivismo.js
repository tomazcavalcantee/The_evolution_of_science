/**
 * cap_positivismo.js — O Ápice Empirista (Bacon → Carnap)
 *
 * TODO: Implementar a cena interativa do debate.
 *       Consulte chapters/_template.js para o passo a passo.
 *
 * Usa ChapterEngine para navegação (inclui botão "Voltar ao Mapa" automaticamente).
 */

App.registerChapter("cap_positivismo", {
    id: "cap_positivismo",
    title: "O Ápice Empirista",

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
