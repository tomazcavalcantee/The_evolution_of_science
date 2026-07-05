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
        "Popper":  { x: 150, y: 450, width: 300, height: 350, file: "popper.svg"  },
        "Thagard": { x: 600, y: 450, width: 300, height: 350, file: "thagard.svg" },
    },

    story: [
        { speaker: "Popper", text: "Para mim, a linha que divide a ciência da pseudociência é nítida: o critério da falsificabilidade. Uma teoria só é científica se fizer previsões ousadas que possam ser provadas erradas publicamente." },
        { speaker: "Thagard", text: "Pura lógica não basta, Popper! Olhe para a Astrologia: os astrólogos frequentemente fazem previsões testáveis em seus mapas. O problema não é a forma lógica, é a comunidade." },
        { speaker: "Popper", text: "Mas se a previsão falha, eles dão desculpas ou mudam as regras do jogo para salvar a hipótese! Isso é uma manobra convencionalista, uma covardia intelectual para blindar o dogma." },
        { speaker: "Thagard", text: "O verdadeiro problema da Astrologia é que ela estagnou no tempo. Ela ignora anomalias crônicas e recusa-se a progredir frente a teorias alternativas, como a psicologia contemporânea." },
        { speaker: "Narrador", text: "Qual critério de demarcação você deseja apoiar?", options: [
            {id: "a", title: "A estrutura lógica", description: "O fator definidor da ciência é o risco nítido da teoria ser falseada."},
            {id: "b", title: "A comunidade e a história", description: "O que define a ciência é o progresso histórico frente a alternativas."},
            { id: "a", story: [
                { speaker: "Popper", text: "Excelente! Diante de um erro gritante no laboratório, a verdadeira ciência exige que se descarte a hipótese sem piedade. O progresso exige demolição!" },
                { speaker: "Thagard", text: "Isso é irrealista! Se fôssemos tão rígidos, a física teria abandonado o heliocentrismo, que nasceu com dados problemáticos. Cientistas precisam de 'teimosia racional'." },
                { speaker: "Narrador", text: "O que deve acontecer quando um teste experimental contradiz uma teoria famosa?", options: [
                    {id: "a", title: "Imediata eliminação", description: "A teoria falhou, logo deve ser eliminada sem hesitação."},
                    {id: "b", title: "Proteção do núcleo", description: "Vale a pena modificar hipóteses auxiliares para salvar a teoria principal."},
                    { id: "a", story: [
                        { speaker: "Popper", text: "Exatamente! Qualquer tentativa de salvá-la é trair a atitude científica." },
                        { speaker: "Narrador", text: "[VEREDITO: Falsificacionista Convicto] Para você, a demarcação é puramente lógica. Se a prática não expõe seu pescoço ao erro através de enunciados arriscados, é dogma." }
                    ]},
                    { id: "b", story: [
                        { speaker: "Thagard", text: "Uma postura sensata. Devemos proteger as teorias até que uma alternativa melhor se mostre." },
                        { speaker: "Narrador", text: "[VEREDITO: Sintetizador da Complexidade] Entende que a ciência precisa ser testável, mas reconhece que historicamente proteger teorias ajuda a resolver anomalias complexas." }
                    ]}
                ]}
            ]},
            { id: "b", story: [
                { speaker: "Thagard", text: "Perfeito. Devemos avaliar se uma disciplina é progressiva ou degenerescente ao longo do tempo, e não julgar apenas uma afirmação isolada." },
                { speaker: "Popper", text: "Focar na psicologia do grupo nos joga em um relativismo perigoso! O critério deve ser lógico, senão qualquer loucura se justifica pela 'comunidade'." },
                { speaker: "Narrador", text: "O que realmente transforma uma doutrina em 'pseudociência'?", options: [
                    {id: "a", title: "Infalibilidade lógica", description: "Ser imune a contestações experimentais diretas."},
                    {id: "b", title: "A recusa em evoluir", description: "A ausência crônica de progresso e o desprezo por concorrentes."},
                    { id: "a", story: [
                        { speaker: "Popper", text: "Um alívio. Uma teoria que explica tudo, no fundo, não explica nada." },
                        { speaker: "Narrador", text: "[VEREDITO: Falsificacionista Convicto] Para você, a demarcação é puramente lógica. Se a prática não expõe seu pescoço ao erro, não passa de pseudociência." }
                    ]},
                    { id: "b", story: [
                        { speaker: "Thagard", text: "Exato. A ciência é um empreendimento vivo. Quando a comunidade para de inovar, a ciência morre." },
                        { speaker: "Narrador", text: "[VEREDITO: Epistemólogo Contextualista] O limite da ciência é histórico e social. Uma prática vira pseudociência quando estagna e ignora o avanço ao seu redor." }
                    ]}
                ]}
            ]}
        ]}
    ],

    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
