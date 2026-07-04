/**
 * cap_metodo.js — Dedução vs. Indução (Descartes vs. Bacon)
 *
 * TODO: Implementar a cena interativa do debate.
 *       Consulte chapters/_template.js para o passo a passo.
 *
 * Usa ChapterEngine para navegação (inclui botão "Voltar ao Mapa" automaticamente).
 */

App.registerChapter("cap_metodo", {
    id: "cap_metodo",
    title: "Dedução vs. Indução",

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
