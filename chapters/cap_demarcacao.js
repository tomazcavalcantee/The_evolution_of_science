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
    background: "imgs/bg_demarcacao.jpg",

    chars: {
        "Popper":  { x: 150, y: 400, width: 300, height: 350, file: "popper.svg"  },
        "Thagard": { x: 600, y: 400, width: 300, height: 350, file: "thagard.svg" },
    },

    // Roteiro — cada entrada é uma fala exibida no painel lateral
    story: [
        { speaker: "Popper", text: "Para mim, a linha que divide a ciência de uma farsa é nítida: é o critério da falsificabilidade." },
        { speaker: "Popper", text: "Uma teoria só pode ser científica caso faça previsões ousadas que possam ser provadas erradas pela observação pública." },
        { speaker: "Thagard", text: "Pura lógica não basta! Olhe para a Astrologia: astrólogos frequentemente fazem previsões específicas e testáveis sobre a vida das pessoas em seus mapas." },
        { speaker: "Popper", text: "Ora, mas se a previsão falha, eles dão desculpas ou mudam as regras do jogo a fim de salvar suas hipóteses." },
        { speaker: "Popper", text: "Isso é uma manobra convencionalista… uma covardia intelectual para blindar o dogma." },
        { speaker: "Thagard", text: "Na verdade, o maior erro não está na falta de lógica, mas no isolamento da comunidade." },
        { speaker: "Thagard", text: "A Astrologia é pseudociência porque se estagnou na história, ignora anomalias crônicas e se recusa em progredir frente a teorias melhores alternativas, como a psicologia contemporânea." },
        { speaker: "Narrador", text: "Qual critério de demarcação você deseja apoiar para iniciar o jogo?", options: [
            {id: "a", title: "A estrutura lógica", description: "O fator definidor da ciência é o risco nítido da teoria ser falseada."},
            {id: "b", title: "A comunidade e a história", description: "O que define a ciência é se a prática mostra progresso ao longo do tempo e compete com alternativas."},
            { id: "a", story: [
                { speaker: "Popper", text: "Excelente! Diante de um erro gritante no laboratório ou de um dado que foge do gráfico, a verdadeira ciência exige que se descarte a hipótese sem piedade. O progresso exige demolição!" },
                { speaker: "Thagard", text: "Isso é irrealista e historicamente falso. Se fôssemos assim tão rígidos, a física teria abandonado o heliocentrismo de Copérnico, que nasceu com dados errados sobre o tamanho aparente de Vênus. Cientistas precisam de teimosia racional para resolver quebra-cabeças antes de jogar um paradigma fora." },
                { speaker: "Narrador", text: "O que deve acontecer quando um teste experimental contradiz uma teoria famosa?", options: [
                    {id: "a", title: "Imediata eliminação", description: "A teoria falhou em um teste rigoroso, logo deve ser profundamente revisada ou eliminada sem hesitação."},
                    {id: "b", title: "Proteção do núcleo", description: "O dado pode estar mal medido ou os instrumentos desajustados: vale a pena modificar hipóteses auxiliares para salvar a teoria principal."},
                    { id: "a", story: [
                        { speaker: "Verredito", title: "falsificacionista convicto", text: "Para você, a demarcação é puramente lógica. Se uma prática não expõe seu pescoço ao erro através de enunciados claros, arriscados e falsificáveis, então não passa de dogma ou pseudociência. A ciência avança por conjecturas ousadas e refutações implacáveis." },
                    ]},
                    { id: "b", story: [
                        { speaker: "Verredito", title: "sintetizador da complexidade", text: "Você buscou o equilíbrio metodológico. Entende que a ciência precisa sre rigorosa e de enunciados que são logicamente testáveis nas suas previsões. Mas, reconhece que na história real os cientistas protegem legitimamente suas teorias por meio de hipóteses auxiliares para dar tempo do paradigma florescer e resolver suas charadas." },
                    ]},
                ]},
            ]},
            { id: "b", story: [
                { speaker: "Thagard", text: "Perfeito. Devemos avaliar se uma disciplina é progressiva ou degenerescente ao longo do tempo. Programas científicos devem descobrir fenômenos novos, não apenas inventar desculpas ad hoc para suas anomalias." },
                { speaker: "Popper", text: "Mas focar na psicologia do grupo ou em fatores sociais nos joga em um relativismo perigoso, Thagard! O critério deve ser lógico e universal: se nenhuma observação pública concebível puder refutar a teoria, ela simplesmente não é empírica." },
                { speaker: "Narrador", text: "O que realmente transforma uma teoria ou doutrina em 'pseudociência'?", options: [
                    {id: "a", title: "Infalibilidade lógica", description: "O fato da teoria ser desenhada de forma tão vaga que consegue explicar tudo, sendo imune a contestações."},
                    {id: "b", title: "A recusa em evoluir", description: "A ausência crônica de progresso teórico ao longo das décadas e desprezo deliberado por teorias concorrentes melhores."},
                    { id: "a", story: [
                        { speaker: "Verredito", title: "falsificacionista convicto", text: "Para você, a demarcação é puramente lógica. Se uma prática não expõe seu pescoço ao erro através de enunciados claros, arriscados e falsificáveis, então não passa de dogma ou pseudociência. A ciência avança por conjecturas ousadas e refutações implacáveis." },
                    ]},
                    { id: "b", story: [
                        { speaker: "Verredito", title: "epistemólogo contextualista", text: "Para você, o limite da ciência é histórico e social. Teorias enfrentam anomalias o tempo todo, mas uma prática só se torna uma pseudociência quando sua comunidade de praticantes se recusa a progredir, fica estagnada no tempo e ignora alternativas modernas melhores." },
                    ]},
                ]},
            ]},
        ]},
    ],

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
