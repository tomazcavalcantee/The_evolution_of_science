const gameData = {
    // Texto da cena atual (pode ser substituído quando o capítulo mudar)
    scene: {
        title: "O Ponto de Partida",
        paragraphs: [
            "O conhecimento científico começa com a observação ou com a teoria? De um lado, temos o <strong>Indutivista</strong>, que acredita na força da repetição. Do outro, o <strong>Empiricista</strong>, que exige a experiência pura.",
            "Quem tem o método mais seguro? Escolha a interação abaixo para iniciar o debate:"
        ]
    },
    // Dados do Grafo
    nodes: [
        { id: "indutivista", label: "Indutivista", x: 100, y: 200, color: "var(--indutivista-color)" },
        { id: "empiricista", label: "Empiricista", x: 300, y: 200, color: "var(--empiricista-color)" }
    ],
    edges: [
        { 
            source: "indutivista", 
            target: "empiricista", 
            btnLabel: "O Peru Indutivista", 
            chapterId: "cap1_peru",
            btnIcon: "🦃"
        }
    ]
};