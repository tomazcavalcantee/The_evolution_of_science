// Capítulo: Popper vs Kuhn — A Ciência Realmente Cresce?
// Debate sobre falsificacionismo de Popper e mudanças de paradigma de Kuhn
// Cenário: monitoramento de um experimento de física de longo prazo com dado anômalo

App.registerChapter("cap_demarcacao_kuhn", {
    id: "cap_demarcacao_kuhn",
    title: "A Ciência Realmente Cresce?",
    background: "imgs/bg_kuhn_popper.jpg",

    chars: {
        "Popper": { x: 150, y: 400, width: 300, height: 350, file: "popper.svg" },
        "Kuhn":   { x: 600, y: 400, width: 300, height: 350, file: "kuhn.svg" },
    },

    story: [
        { speaker: "Narrador", text: "Você está monitorando um experimento de física de longo prazo. Durante semanas, o gráfico mostrou uma linha perfeitamente suave e previsível. De repente, na última execução, um único ponto de dados dispara descontroladamente para fora do gráfico, entrando em uma zona teoricamente impossível." },
        { speaker: "Narrador", text: "O que você escolhe fazer?", options: [
            {id: "a", title: "Assumir erro experimental", description: "Assumir que houve um erro experimental e reajustar a máquina."},
            {id: "b", title: "Assumir teoria incorreta", description: "Assumir que a teoria está incorreta e aceitar a anomalia."},
            { id: "a", story: [
                { speaker: "Kuhn", text: "Eu acredito que essa foi uma escolha sensata! É isso que eu chamo de Ciência Normal. Não se descarta um paradigma brilhante e consolidado só por causa de um dado problemático." },
                { speaker: "Popper", text: "Covardia intelectual! Você está tratando sua teoria como um dogma sagrado. Aquele valor atípico era uma oportunidade de ouro para refutá-la!" },
                { speaker: "Popper", text: "Discordo, ao ajustar a máquina para proteger sua hipótese, você está recorrendo a uma manobra convencionalista para evitar a dura verdade. A verdadeira ciência exige coragem para aceitar a refutação!" },
                { speaker: "Kuhn", text: "Quanta bobagem, podemos verificar se a falha está nos instrumentos ou nas medições. Não escute ele, você está agindo como um verdadeiro cientista, resolvendo um quebra-cabeça dentro das regras." },
            ]},
            { id: "b", story: [
                { speaker: "Popper", text: "Magnífico! Você é um verdadeiro buscador da verdade. No momento em que uma teoria faz uma previsão errada, ela deve ser descartada sem piedade ou profundamente revisada." },
                { speaker: "Kuhn", text: "Você está sendo completamente irrealista Popper. Se os cientistas abandonassem seus paradigmas toda vez que um teste desse errado, a ciência teria parado na Idade da Pedra." },
                { speaker: "Popper", text: "Não. Ao aceitar essa refutação, você abre caminho para uma conjectura mais ousada e melhor. O progresso exige destruição!" },
                { speaker: "Kuhn", text: "Errado! Ninguém vai reescrever os livros de física por causa de uma tarde estranha no seu laboratório. Você não causou uma revolução; apenas abandonou uma ferramenta perfeitamente válida." },
            ]},
        ]},
    ],

    // Inicializa o capítulo com o motor de renderização
    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
