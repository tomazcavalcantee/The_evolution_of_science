// Capítulo: Kuhn vs Lakatos — Paradigmas vs Programas de Pesquisa
// Debate sobre se a ciência é um processo racional ou uma mudança irracional de paradigma
// Cenário: cientista com teoria T confrontado por anomalia de rival

App.registerChapter("cap_kuhn_lakatos", {
    id: "cap_kuhn_lakatos",
    title: "Paradigmas vs Programas de Pesquisa",
    background: "imgs/bg_kuhn_lakatos.jpg",

    chars: {
        "Kuhn":    { x: 150, y: 400, width: 300, height: 350, file: "kuhn.svg" },
        "Lakatos": { x: 600, y: 400, width: 300, height: 350, file: "lakatos-brown.svg" },
    },

    story: [
        { speaker: "Narrador", text: "Você é um cientista em um laboratório. Suponha que você desenvolveu uma teoria sólida. Subitamente, surge uma anomalia grave que sua teoria não explica." },
        { speaker: "Narrador", text: "O que você escolhe fazer?", options: [
            {id: "a", title: "Descartar a Teoria", description: "Abandonar sua teoria diante da anomalia avassaladora."},
            {id: "b", title: "Manter a Teoria", description: "Defender sua teoria e tentar acomodar a anomalia."},
            { id: "a", story: [
                { speaker: "Kuhn", text: "Perfeito! Você percebeu que precisamos de um novo sistema. Estamos em crise; é hora de uma revolução científica e mudar para um novo paradigma." },
                { speaker: "Lakatos", text: "Uma 'revolução', Kuhn? O que você chama de revolução cheira a psicologia das massas. A ciência avança pela competição racional de programas, e não por conversões místicas." },
                { speaker: "Kuhn", text: "Você tenta impor uma racionalidade artificial! A mudança de paradigma é uma ruptura profunda de visão de mundo. Não existe uma 'matemática' que decida quando mudar." },
                { speaker: "Lakatos", text: "E é por isso que sua visão reduz a ciência a um jogo de sociologia irracional. Descartar a teoria vigente sem um substituto estritamente progressivo é pura confusão." }
            ]},
            { id: "b", story: [
                { speaker: "Lakatos", text: "Uma atitude madura. Nós preservamos o 'núcleo duro' do programa de pesquisa e ajustamos apenas as hipóteses periféricas para abrigar a anomalia." },
                { speaker: "Kuhn", text: "Isso é o dogmatismo da 'ciência normal'! O jogador está apenas articulando as velhas regras do paradigma, varrendo os problemas para debaixo do tapete." },
                { speaker: "Lakatos", text: "Não é dogmatismo se os ajustes nos levarem a descobertas inéditas! Nós somos racionais, protegemos o programa enquanto ele for vivo e progressivo." },
                { speaker: "Kuhn", text: "Você cria regras retrospectivas ilusórias, Lakatos. Na prática, nenhum laboratório mede progresso assim. Eles seguem uma fé cega no paradigma até o colapso." }
            ]}
        ]}
    ],

    // Inicializa o capítulo com o motor de renderização
    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
