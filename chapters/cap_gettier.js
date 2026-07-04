/**
 * cap_gettier.js — O Problema de Gettier (Platão vs. Gettier)
 *
 * TODO: Implementar a cena interativa do debate.
 *       Consulte chapters/_template.js para o passo a passo.
 *
 * Usa ChapterEngine para navegação (inclui botão "Voltar ao Mapa" automaticamente).
 */

App.registerChapter("cap_gettier", {
    id: "cap_gettier",
    title: "O Problema de Gettier",

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
