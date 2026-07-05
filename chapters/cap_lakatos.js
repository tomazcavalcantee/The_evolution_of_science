// Capítulo: Popper vs Lakatos — Programas de Pesquisa
// Debate sobre a rapidez com que se deve descartar uma teoria falha
// Cenário: experimento de Michelson-Morley e a Teoria do Éter
// Árvore de diálogo complexa com escolhas secundárias levando a vereditos

App.registerChapter("cap_lakatos", {
    id: "cap_lakatos",
    title: "Programas de Pesquisa",
    background: "imgs/bg_lakatos.jpg",

    chars: {
        "Popper":  { x: 150, y: 400, width: 300, height: 350, file: "popper.svg" },
        "Lakatos": { x: 600, y: 400, width: 300, height: 350, file: "lakatos-brown.svg" },
    },

    story: [
        { speaker: "Popper", text: "A verdadeira atitude científica é a atitude crítica. Se uma teoria falha em um teste rigoroso, como o experimento de Michelson-Morley fez com o éter luminífero, ela deve ser descartada. Tentar salvá-la com remendos é uma manobra convencionalista e pura covardia intelectual!" },
        { speaker: "Lakatos", text: "Você é ingênuo, Karl. Nenhuma teoria nasce perfeita; todas nascem em um oceano de anomalias. A ciência não funciona por refutações instantâneas. Nós temos um 'núcleo duro' de crenças fundamentais que protegemos, e apenas ajustamos as hipóteses auxiliares do 'cinturão protetor'." },
        { speaker: "Popper", text: "Proteger o núcleo? Isso é transformar a ciência em dogma! A ciência exige que coloquemos nossas hipóteses em risco de refutação constante." },
        { speaker: "Lakatos", text: "Não é dogma, é tenacidade racional. Nós só descartamos um Programa de Pesquisa quando ele para de prever fatos novos e se torna degenerescente, e apenas se houver um programa rival melhor para substituí-lo." },
        { speaker: "Narrador", text: "Imagine que você presenciou o experimento de Michelson e Morley: a criação de um interferômetro que verifica a não existência de um fluído abstrato que permeia todo o universo. Esse experimento produz um resultado que contradiz uma teoria famosa e consagrada, a Teoria do Éter. O que deve ser feito com essa teoria?" },
        { speaker: "Narrador", text: "O que fazer com a Teoria do Éter?", options: [
            {id: "a", title: "Descartar Teoria", description: "A teoria falhou no teste, deve ser descartada sem hesitação."},
            {id: "b", title: "Manter Teoria", description: "Proteger o núcleo duro e ajustar hipóteses auxiliares."},

            // Ramo A: escolheu descartar a teoria
            { id: "a", story: [
                { speaker: "Popper", text: "Você fez bem em descartar a teoria. Precisamos ter coragem suficiente para admitir que estamos errados no momento em que uma teoria falha em um teste!" },
                { speaker: "Lakatos", text: "Um desastre absoluto. Você acabou de jogar fora anos de pesquisa promissora por causa de uma única anomalia. Se tivéssemos feito isso com a Mecânica Newtoniana por conta das anomalias da órbita de Urano, nunca teríamos descoberto Netuno! A questão agora é como você julga o que deve substituir sua teoria descartada." },
                { speaker: "Popper", text: "E isso, Lakatos, é exatamente o que destrói a ciência empírica! Se permitirmos que os cientistas remendem incessantemente suas teorias falhas, estaremos protegendo-os da realidade." },
                { speaker: "Lakatos", text: "Veja aonde essa teoria nos leva: a uma progressiva mudança do problema! Não se pode julgar um programa de pesquisa com base em um único momento no tempo. Precisamos dar às teorias espaço para respirar, para crescer, se recuperar e voltar a ser progressivas, em vez de descartá-las ao primeiro sinal de dificuldade." },

                // Escolha secundária: critério para a nova teoria substituta
                { speaker: "Narrador", text: "O que a nova teoria precisa ter para substituir a antiga?", options: [
                    {id: "c", title: "Maior testabilidade", description: "A nova teoria precisa ser estruturada de forma ainda mais clara, permitindo testes lógicos ainda mais rigorosos e arriscados de serem falseados."},
                    {id: "d", title: "Previsão de fatos novos", description: "A nova teoria só é aceitável se for um programa de pesquisa 'progressivo', capaz de prever fenômenos inéditos que a teoria anterior sequer imaginava."},

                    // Veredito C: Falsificacionista Convicto
                    { id: "c", story: [
                        { speaker: "Verredito", title: "Falsificacionista Convicto", text: "Para você, a ciência avança pelo método de tentativa e erro impiedoso. A demarcação é puramente lógica. Se uma teoria falha no laboratório, o cientista honesto deve aceitar a refutação e formular uma nova conjectura ousada. Remendos ad hoc são o caminho para a pseudociência." },
                    ]},

                    // Veredito D: Falsificacionista Sofisticado
                    { id: "d", story: [
                        { speaker: "Verredito", title: "Falsificacionista Sofisticado", text: "Você buscou o equilíbrio metodológico. Você concorda com Popper que teorias precisam correr riscos reais, mas entende com Lakatos que refutações instantâneas são um mito. Você aceita o uso de hipóteses auxiliares para dar tempo ao paradigma florescer, desde que essas modificações levem a novas previsões testáveis, e não a um beco sem saída." },
                    ]},
                ]},
            ]},

            // Ramo B: escolheu manter a teoria
            { id: "b", story: [
                { speaker: "Lakatos", text: "Você foi completamente racional. O que precisamos fazer é acrescentar uma nova hipótese para explicar a anomalia sem destruir o 'núcleo duro' do programa." },
                { speaker: "Popper", text: "Racionalidade? Isso é erro! Ao fazer esses remendos infinitos e desculpas para salvar suas hipóteses, você está transformando a teoria em um monstro bizarro de modificações ad hoc. Quando você finalmente admite a derrota?" },
                { speaker: "Lakatos", text: "Não são remendos dogmáticos se as novas hipóteses forem progressivas! Se ao proteger o núcleo nós conseguirmos prever fatos novos que ninguém esperava, o programa continua vivo e racional. Dogmatismo seria manter o programa mesmo quando ele se torna cronicamente degenerativo." },
                { speaker: "Kuhn", text: "Mas a história mostra que nenhum cientista fica calculando se o programa é 'progressivo' ou 'degenerativo' em uma planilha. Eles simplesmente partilham de uma fé comum em um paradigma. Você tenta salvar a racionalidade da ciência criando regras metodológicas retrospectivas que nenhum laboratório real segue no calor do momento." },

                // Escolha secundária: até quando proteger a teoria
                { speaker: "Narrador", text: "Até quando é justificável proteger uma teoria com hipóteses auxiliares?", options: [
                    {id: "e", title: "Rigor lógico imediato", description: "No instante em que as desculpas impedem que qualquer observação pública concebível refute a teoria, ela deixou de ser empírica e virou pseudociência."},
                    {id: "f", title: "Quando o programa degenera", description: "Abandonamos a teoria apenas quando os ajustes servem apenas para explicar erros passados sem prever nada de novo, e surge um programa rival mais progressivo."},

                    // Veredito E: Falsificacionista Sofisticado
                    { id: "e", story: [
                        { speaker: "Verredito", title: "Falsificacionista Sofisticado", text: "Você buscou o equilíbrio metodológico. Você concorda com Popper que teorias precisam correr riscos reais, mas entende com Lakatos que refutações instantâneas são um mito. Você aceita o uso de hipóteses auxiliares para dar tempo ao paradigma florescer, desde que essas modificações levem a novas previsões testáveis, e não a um beco sem saída." },
                    ]},

                    // Veredito F: Metodologista de Programas
                    { id: "f", story: [
                        { speaker: "Verredito", title: "Metodologista de Programas", text: "Para você, a ciência não é uma série de duelos isolados entre teoria e experimento, mas uma guerra de longo prazo entre Programas de Pesquisa. É perfeitamente científico proteger uma teoria fundamental (núcleo duro) enquanto ela continuar sendo 'progressiva' e gerando novas descobertas. O descarte só acontece diante de uma alternativa melhor e histórica." },
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
