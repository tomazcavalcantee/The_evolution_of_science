/**
 * cap_demarcacao.js — O Problema da Demarcação (Thagard vs. Popper)
 *
 * TODO: Implementar a cena interativa do debate.
 *       Consulte chapters/_template.js para o passo a passo.
 *
 * Usa ChapterEngine para navegação (inclui botão "Voltar ao Mapa" automaticamente).
 */

App.registerChapter("cap_demarcacao", {
    id: "cap_demarcacao",
    title: "O Problema da Demarcação",

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
