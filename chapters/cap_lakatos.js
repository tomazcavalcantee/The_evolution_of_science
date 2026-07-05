// Capítulo: Popper vs Lakatos — Programas de Pesquisa
// Debate sobre a rapidez com que se deve descartar uma teoria falha
// Cenário: experimento de Michelson-Morley e a Teoria do Éter
// Árvore de diálogo complexa com escolhas secundárias levando a vereditos

App.registerChapter("cap_lakatos", {
    id: "cap_lakatos",
    title: "Programas de Pesquisa",
    background: "imgs/bg_lakatos.jpg",

    chars: {
        "Popper":  { x: 100, y: 450, width: 300, height: 350, file: "popper.svg" },
        "Lakatos": { x: 650, y: 450, width: 300, height: 350, file: "lakatos-brown.svg" },
    },

    story: [
        { speaker: "Popper", text: "A verdadeira atitude científica é crítica. Se uma teoria falha em um teste rigoroso, como o experimento de Michelson-Morley fez com o éter, ela deve ser descartada. Tentar salvá-la com remendos é covardia intelectual!" },
        { speaker: "Lakatos", text: "Você é ingênuo, Karl. Nenhuma teoria nasce perfeita. A ciência não funciona por refutações instantâneas. Nós temos um 'núcleo duro' de crenças que protegemos, e apenas ajustamos as hipóteses do 'cinturão protetor'." },
        { speaker: "Popper", text: "Proteger o núcleo? Isso é transformar a ciência em dogma! A ciência exige que coloquemos nossas hipóteses em risco constante de refutação." },
        { speaker: "Lakatos", text: "Não é dogma, é tenacidade racional. Nós só descartamos um Programa de Pesquisa quando ele para de prever fatos novos e se torna degenerescente." },
        { speaker: "Narrador", text: "O experimento de Michelson-Morley acabou de produzir um resultado que contradiz brutalmente a famosa Teoria do Éter. O que deve ser feito com ela?", options: [
            {id: "a", title: "Descartar Teoria", description: "A teoria falhou no teste e deve ser descartada."},
            {id: "b", title: "Manter Teoria", description: "Proteger o núcleo duro e ajustar hipóteses auxiliares."},

            // Ramo A: escolheu descartar a teoria
            { id: "a", story: [
                { speaker: "Popper", text: "Você fez bem! Precisamos ter coragem suficiente para admitir o erro no momento em que a teoria falha." },
                { speaker: "Lakatos", text: "Um desastre absoluto. Você jogou fora anos de pesquisa por causa de uma única anomalia. Se tivéssemos feito isso com Newton, nunca teríamos descoberto Netuno!" },
                { speaker: "Popper", text: "Se permitirmos remendos incessantes, estaremos protegendo os cientistas da realidade. O choque com o erro é o motor do conhecimento!" },
                { speaker: "Lakatos", text: "Teorias precisam de espaço para respirar e voltar a ser progressivas, em vez de descartá-las ao primeiro sinal de dificuldade." },

                // Escolha secundária
                { speaker: "Narrador", text: "O que a nova teoria precisa ter para substituir a antiga legitimamente?", options: [
                    {id: "c", title: "Maior testabilidade", description: "Ser estruturada permitindo testes lógicos ainda mais rigorosos."},
                    {id: "d", title: "Previsão de novos fatos", description: "Ser um programa capaz de prever fenômenos inéditos."},

                    { id: "c", story: [
                        { speaker: "Popper", text: "Perfeito, a demarcação continua afiada e testável." },
                        { speaker: "Narrador", text: "[VEREDITO: Falsificacionista Convicto] Para você, a ciência avança pelo método de tentativa e erro impiedoso. Remendos ad hoc são o caminho para a pseudociência." },
                    ]},
                    { id: "d", story: [
                        { speaker: "Lakatos", text: "Exato, um autêntico avanço científico!" },
                        { speaker: "Narrador", text: "[VEREDITO: Falsificacionista Sofisticado] Você buscou o equilíbrio. Concorda em correr riscos reais, mas entende que refutações instantâneas são um mito." },
                    ]},
                ]},
            ]},

            // Ramo B: escolheu manter a teoria
            { id: "b", story: [
                { speaker: "Lakatos", text: "Você foi racional. O que precisamos fazer é acrescentar uma nova hipótese para explicar a anomalia sem destruir o núcleo da teoria." },
                { speaker: "Popper", text: "Racionalidade? Isso é autoengano! Ao inventar desculpas para salvar a teoria, você a transforma num monstro bizarro de remendos 'ad hoc'." },
                { speaker: "Lakatos", text: "Não são desculpas vazias se as novas hipóteses forem progressivas e preverem fatos novos! O programa continua vivo." },
                { speaker: "Popper", text: "Mas isso blinda o cientista da realidade! Inventar remendos livremente é a licença para o dogmatismo absoluto!" },

                // Escolha secundária
                { speaker: "Narrador", text: "Até quando é justificável proteger uma teoria com hipóteses auxiliares?", options: [
                    {id: "e", title: "Rigor lógico imediato", description: "Até as desculpas impedirem refutações públicas concebíveis."},
                    {id: "f", title: "Quando o programa degenera", description: "Até os ajustes servirem apenas para explicar erros passados sem previsões."},

                    { id: "e", story: [
                        { speaker: "Popper", text: "Pelo menos você entende o limite do dogmatismo." },
                        { speaker: "Narrador", text: "[VEREDITO: Falsificacionista Sofisticado] Você busca equilíbrio. Aceita proteger a teoria para o paradigma florescer, mas apenas enquanto permite testes lógicos." },
                    ]},
                    { id: "f", story: [
                        { speaker: "Lakatos", text: "Finalmente compreendeu o verdadeiro espírito da pesquisa científica." },
                        { speaker: "Narrador", text: "[VEREDITO: Metodologista de Programas] Para você, é perfeitamente científico proteger uma teoria fundamental, contanto que ela gere novas descobertas históricas." },
                    ]},
                ]},
            ]},
        ]},
    ],

    // Inicializa o capítulo com o motor de renderização
    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
