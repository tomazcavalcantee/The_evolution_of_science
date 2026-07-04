/**
 * cap_peru.js — Cena do Peru de Russell com SVGs externos
 */

App.registerChapter("cap_peru", {
    state: {
        step: 0,
        story: [
    {
        speaker: "Bacon",
        text: "Sábia decisão, jogador. Você escolheu o caminho da prática e da observação."
    },
    {
        speaker: "Bacon",
        text: "A ciência não se faz com adivinhações, mas com fatos reais."
    },
    {
        speaker: "Bacon",
        text: "Ao alimentar o peru hoje, iniciamos um teste."
    },
    {
        speaker: "Bacon",
        text: "Se repetirmos isso todos os dias e o resultado for o mesmo, teremos uma lei da natureza."
    },
    {
        speaker: "Bacon",
        text: "A experiência é a única base segura para a verdade."
    },

    {
        speaker: "Hume",
        text: "Sua fé na constância é quase tocante, Bacon."
    },
    {
        speaker: "Hume",
        text: "Mas acredito que o jogador tenha apenas se rendido à ilusão do hábito."
    },
    {
        speaker: "Hume",
        text: "Só porque o peru comeu e sobreviveu hoje..."
    },
    {
        speaker: "Hume",
        text: "...não significa que sobreviverá novamente amanhã."
    },
    {
        speaker: "Hume",
        text: "O que vemos não é causa e efeito."
    },
    {
        speaker: "Hume",
        text: "Vemos apenas dois fatos distintos em sequência."
    },
    {
        speaker: "Hume",
        text: "Essa regularidade em que você acredita..."
    },
    {
        speaker: "Hume",
        text: "...é apenas uma exigência da sua mente."
    },

    {
        speaker: "Bacon",
        text: "*suspiro* Se dependêssemos das suas dúvidas, Hume..."
    },
    {
        speaker: "Bacon",
        text: "...a humanidade nunca teria saído das cavernas."
    },
    {
        speaker: "Bacon",
        text: "Não estamos adivinhando o futuro."
    },
    {
        speaker: "Bacon",
        text: "Quando investigamos um fato sob várias condições e com método..."
    },
    {
        speaker: "Bacon",
        text: "...deciframos a natureza passo a passo."
    },
    {
        speaker: "Bacon",
        text: "Entender as regras do mundo não é um delírio do cérebro."
    },
    {
        speaker: "Bacon",
        text: "É o que nos dá controle sobre a realidade."
    },

    {
        speaker: "Hume",
        text: "Essas regras estão só na sua cabeça, Bacon!"
    },
    {
        speaker: "Hume",
        text: "Olhe bem para esse animal."
    },
    {
        speaker: "Hume",
        text: "Ele também professa a sua filosofia."
    },
    {
        speaker: "Hume",
        text: "Habituou-se a associar o movimento de nossas mãos ao alimento."
    },
    {
        speaker: "Hume",
        text: "Projeta o passado no futuro com absoluta certeza."
    },
    {
        speaker: "Hume",
        text: "Mas o ontem jamais dita o amanhã."
    },
    {
        speaker: "Hume",
        text: "Se o destino deste infeliz for o banquete de logo mais..."
    },
    {
        speaker: "Hume",
        text: "...toda a sua estrutura de certezas ruirá."
    },
    {
        speaker: "Hume",
        text: "Em um único e fatal instante."
    }
],
        // Ajuste as coordenadas conforme necessário para o seu cenário de fundo
        chars: {
    "Bacon": { 
        x: 80, 
        y: 500, 
        width: 220,
        height: 250,
        file: "bacon.svg" 
    },

    "Peru":  { 
        x: 330, 
        y: 430,
        width: 310,
        height: 220,
        file: "peru.svg" 
    },

    "Hume":  { 
        x: 650, 
        y: 500,
        width: 240,
        height: 270,
        file: "hume.svg" 
    }
}
    },

    start() {
        const svg = document.getElementById('graph-container');
        svg.setAttribute("viewBox", "0 0 1000 800");

        this.state.step = 0;
        this.renderBackground();
        this.renderCharacters();
        
        setTimeout(() => this.nextStep(), 500);
    },

    nextStep() {
        const { panGroup } = App.state;
        const oldBubble = panGroup.querySelector('.bubble-group');
        if (oldBubble) oldBubble.remove();

        if (this.state.step < this.state.story.length) {
            const fala = this.state.story[this.state.step];
            const charData = this.state.chars[fala.speaker];
            
            // Ajustamos o balão para aparecer acima do SVG do personagem
            this.drawSpeechBubble(panGroup, charData.x + 50, charData.y - 20, fala.text, false);
            this.state.step++;
        } else {
            this.drawSpeechBubble(panGroup, 500, 400, "<strong>Fim do debate.</strong><br>(Clique para fechar)", true);
        }
    },

    // ... (função drawSpeechBubble permanece a mesma que já temos)

    async renderBackground() {
        const { panGroup } = App.state;
        panGroup.innerHTML = ''; 
        App.state.currentPan = {x: 0, y: 0};
        panGroup.setAttribute("transform", "translate(0,0)");

        const bgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        bgImage.setAttributeNS(null, "href", "assets/cenario.svg");
        bgImage.setAttributeNS(null, "width", "1000");
        bgImage.setAttributeNS(null, "height", "800");
        bgImage.setAttributeNS(null, "preserveAspectRatio", "xMidYMid slice");
        panGroup.appendChild(bgImage);
    },

    renderCharacters() {
    const { panGroup } = App.state;

    Object.entries(this.state.chars).forEach(([nome, info]) => {
        this.drawChar(
            panGroup,
            info.x,
            info.y,
            info.width,
            info.height,
            info.file
        );
    });
},

drawChar(parent, x, y, width, height, fileName) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "char-instance");

    // Criando a imagem do personagem
    const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    img.setAttributeNS(null, "href", `assets/${fileName}`);
    img.setAttributeNS(null, "x", x);
    img.setAttributeNS(null, "y", y);
    img.setAttributeNS(null, "width", width);
    img.setAttributeNS(null, "height", height);

    // Opcional: mantém a proporção do SVG
    img.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

    // Adiciona apenas a imagem
    g.appendChild(img);
    parent.appendChild(g);
}
});
