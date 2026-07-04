/**
 * cap_observacao.js — A Observação não é Neutra (Carnap vs. Popper)
 *
 * TODO: Implementar a cena interativa do debate.
 *       Consulte chapters/_template.js para o passo a passo.
 *
 * Usa ChapterEngine para navegação (inclui botão "Voltar ao Mapa" automaticamente).
 */

App.registerChapter("cap_observacao", {
    id: "cap_observacao",
    title: "A Observação não é Neutra",

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
