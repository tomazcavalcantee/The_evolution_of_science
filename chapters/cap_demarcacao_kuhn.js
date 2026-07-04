/**
 * cap_demarcacao_kuhn.js — Demarcação e Anomalias (Popper vs. Kuhn)
 *
 * TODO: Implementar a cena interativa do debate.
 *       Consulte chapters/_template.js para o passo a passo.
 *
 * Usa ChapterEngine para navegação (inclui botão "Voltar ao Mapa" automaticamente).
 */

App.registerChapter("cap_demarcacao_kuhn", {
    id: "cap_demarcacao_kuhn",
    title: "Demarcação e Anomalias",

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
