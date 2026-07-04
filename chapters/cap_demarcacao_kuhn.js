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

    story: [
        { speaker: "Karl Popper", text: "A verdadeira atitude científica é a atitude crítica. Devemos formular nossas teorias de maneira que elas possam ser testadas e, se possível, refutadas." },
        { speaker: "Thomas Kuhn", text: "Mas, Karl, a história da ciência não funciona assim. Cientistas não tentam refutar suas próprias teorias o tempo todo. Eles trabalham dentro de um paradigma." },
        { speaker: "Karl Popper", text: "Um paradigma? Isso soa como um dogma! Se uma teoria não pode ser criticada e não aceita falsificações, ela deixa de ser ciência." },
        { speaker: "Thomas Kuhn", text: "Não é dogma, é pragmatismo. Sem o paradigma, não haveria pesquisa aprofundada. Quando surgem anomalias, elas são primeiro ignoradas ou acomodadas, não causam rejeição imediata da teoria." },
        { speaker: "Karl Popper", text: "Ignorar anomalias é o comportamento de pseudocientistas. A ciência só progride quando temos a coragem de jogar fora as teorias que falham nos testes cruciais!" },
        { speaker: "Thomas Kuhn", text: "Na verdade, a ciência só progride através de revoluções, e elas só ocorrem quando a pressão das anomalias se torna absolutamente insustentável. Até lá, a 'ciência normal' segue seu curso." }
    ],

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
