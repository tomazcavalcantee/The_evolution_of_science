// Capítulo: Kuhn vs Lakatos — Paradigmas vs Programas de Pesquisa
// Debate sobre se a ciência é um processo racional ou uma mudança irracional de paradigma
// Cenário: cientista com teoria T confrontado por anomalia de rival

App.registerChapter("cap_kuhn_lakatos", {
    id: "cap_kuhn_lakatos",
    title: "Paradigmas vs Programas de Pesquisa",
    background: "imgs/bg_kuhn_lakatos.jpg",

    story: [
        { speaker: "Narrador", text: "Você é um cientista em um laboratório. Suponha que você desenvolveu uma teoria T. Um cientista rival surge com uma anomalia. O que você escolhe?" },
        { speaker: "Narrador", text: "O que fazer com sua teoria?", options: [
            {id: "a", title: "Descartar Teoria", description: "Abandonar a teoria T diante da anomalia apresentada."},
            {id: "b", title: "Manter Teoria", description: "Defender a teoria T e tentar acomodar a anomalia."},
            { id: "a", story: [
                { speaker: "Kuhn", text: "Perfeito! Você percebeu que precisamos mudar totalmente o sistema atual! Estamos em crise; inicie uma revolução e mude para o novo paradigma." },
                { speaker: "Lakatos", text: "Uma 'revolução', Kuhn? O que você chama de revolução nada mais é do que psicologia das massas. A ciência avança pela competição racional entre programas de pesquisa, avaliando qual deles é progressivo, e não por surtos de mudança de mentalidade." },
                { speaker: "Kuhn", text: "Você tenta impor uma racionalidade artificial, Lakatos. A mudança de paradigma é uma mudança de visão de mundo. Não há um supercritério neutro ou uma 'matemática da razão' que decida quando mudar. Dois cientistas em paradigmas diferentes olham para o mesmo ponto e enxergam coisas completamente distintas." },
                { speaker: "Lakatos", text: "E é por isso que sua visão reduz a ciência a um jogo de poder e sociologia. A escolha por um novo programa pode e deve ser racional: nós mudamos quando o novo programa prevê fatos novos e surpreendentes que o antigo não conseguia explicar. Descartar a teoria sem um substituto progressivo é apenas caos, não progresso." },
            ]},
            { id: "b", story: [
                { speaker: "Lakatos", text: "Você foi completamente racional. O que precisamos fazer é acrescentar uma nova hipótese para explicar a anomalia sem destruir o 'núcleo duro' do programa." },
                { speaker: "Kuhn", text: "Racional, Lakatos? Isso é o bom e velho dogmatismo da ciência normal! O jogador está apenas articulando o paradigma atual para ignorar a realidade." },
                { speaker: "Lakatos", text: "Não são remendos dogmáticos se as novas hipóteses forem progressivas! Se ao proteger o núcleo nós conseguirmos prever fatos novos que ninguém esperava, o programa continua vivo e racional. Dogmatismo seria manter o programa mesmo quando ele se torna cronicamente degenerativo." },
                { speaker: "Kuhn", text: "Mas a história mostra que nenhum cientista fica calculando se o programa é 'progressivo' ou 'degenerativo' em uma planilha. Eles simplesmente partilham de uma fé comum em um paradigma. Você tenta salvar a racionalidade da ciência criando regras metodológicas retrospectivas que nenhum laboratório real segue no calor do momento." },
            ]},
        ]},
    ],

    // Inicializa o capítulo com o motor de renderização
    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
