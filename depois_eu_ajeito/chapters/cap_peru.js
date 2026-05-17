/**
 * cap_peru.js — Cena do Peru de Russell com SVGs externos
 */

App.registerChapter("cap_peru", {
    state: {
        step: 0,
        story: [
            { speaker: "Bacon", text: "A observação repetida nos leva à verdade universal. Vejam este peru empírico." },
            { speaker: "Peru", text: "Glu glu! O humano me traz milho todos os dias às 9h da manhã. O padrão é uma lei natural!" },
            { speaker: "Hume", text: "Mas o que garante que o amanhã será igual ao passado? Isso é apenas o hábito da sua mente." },
            { speaker: "Bacon", text: "A natureza é uniforme! A indução nos garante que o Sol nascerá, e que o peru será alimentado." },
            { speaker: "Hume", text: "Pois bem... Eu ouvi dizer que amanhã é véspera de Natal." },
            { speaker: "Peru", text: "Espera... O que isso quer dizer? O milho vai atrasar?" }
        ],
        // Ajuste as coordenadas conforme necessário para o seu cenário de fundo
        chars: {
            "Bacon": { x: 150, y: 550, file: "bacon.svg" }, 
            "Peru":  { x: 450, y: 600, file: "peru.svg" }, 
            "Hume":  { x: 750, y: 550, file: "hume.svg" }  
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
            this.drawChar(panGroup, info.x, info.y, nome, info.file);
        });
    },

    drawChar(parent, x, y, label, fileName) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "char-instance");

        // Criando a imagem do personagem
        const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
        img.setAttributeNS(null, "href", `assets/${fileName}`);
        img.setAttributeNS(null, "x", x);
        img.setAttributeNS(null, "y", y);
        img.setAttributeNS(null, "width", "120");  // Ajuste o tamanho conforme seus SVGs
        img.setAttributeNS(null, "height", "120");

        // Nome do personagem abaixo dele
        const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.setAttribute("x", x + 60); // Centralizado em relação à largura (120/2)
        t.setAttribute("y", y + 140); 
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("font-family", "'Cinzel', serif");
        t.setAttribute("font-size", "22");
        t.setAttribute("fill", "#2c1e16");
        t.textContent = label;

        g.appendChild(img);
        g.appendChild(t);
        parent.appendChild(g);
    }
});
