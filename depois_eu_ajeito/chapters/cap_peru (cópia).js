App.registerChapter("cap_peru", {
    state: {
        step: 0,
        story: [ /* seus diálogos */ ],
        chars: {
            "Bacon": { x: 350,  y: 750, color: "#5776b9" }, 
            "Peru":  { x: 839,  y: 750, color: "#fb8500" }, 
            "Hume":  { x: 1320, y: 750, color: "#8e0000" }
        }
    },

    start() {
        const container = document.querySelector('.container');
        const mapContainer = document.querySelector('.map-container');
        const svg = document.getElementById('graph-container');

        // 1. Muda o viewBox do SVG para o tamanho real da sua imagem
        svg.setAttribute("viewBox", "0 0 1678 937");

        mapContainer.style.aspectRatio = "1678 / 937";

        // 3. Renderiza o fundo e os personagens
        this.renderBackground();
        this.renderCharacters();
        
        // Dá um tempinho de meio segundo para o cenário aparecer antes do 1º balão
        setTimeout(() => this.nextStep(), 500);
    },

    nextStep() {
        const { panGroup } = App.state;

        // Limpa o balão de fala atual
        const oldBubble = panGroup.querySelector('.bubble-group');
        if (oldBubble) oldBubble.remove();

        if (this.state.step < this.state.story.length) {
            const fala = this.state.story[this.state.step];
            const charData = this.state.chars[fala.speaker];
            
            // Desenha o balão passando a posição X e o Y ajustado para cima da cabeça
            this.drawSpeechBubble(panGroup, charData.x, charData.y - 80, fala.text, false);
            
            this.state.step++;
        } else {
            // Cena finaliza no personagem do centro (Peru)
            this.drawSpeechBubble(panGroup, 500, 500, "<strong>Fim do debate.</strong><br><span style='font-size: 0.8em; opacity: 0.7;'>(Clique para fechar)</span>", true);
        }
    },

    drawSpeechBubble(parent, x, y, text, isEnd) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "bubble-group bubble-pop");
        
        // Define o tamanho da "caixa" do balão
        const bubbleWidth = 320;
        const bubbleHeight = 160;

        // O foreignObject nos deixa injetar HTML/CSS no meio do SVG
        const fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        fo.setAttribute("x", x - (bubbleWidth / 2)); // Centraliza no personagem
        fo.setAttribute("y", y - bubbleHeight);      // Joga para cima da cabeça
        fo.setAttribute("width", bubbleWidth);
        fo.setAttribute("height", bubbleHeight + 25); // +25 para caber a pontinha do balão

        // A div HTML real do balão
        const div = document.createElement("div");
        div.className = "speech-bubble";
        div.innerHTML = text;

        // Adiciona a interatividade diretamente no balão!
        div.onclick = () => {
            if (isEnd) {
                window.location.reload(); // Sai do capítulo
            } else {
                this.nextStep(); // Chama a próxima fala
            }
        };

        fo.appendChild(div);
        g.appendChild(fo);
        parent.appendChild(g);
    },

	async renderBackground() {
    const { panGroup } = App.state;
    const VW = 1000;
    const VH = 800;

    panGroup.innerHTML = ''; 
    App.state.currentPan = {x: 0, y: 0};
    panGroup.setAttribute("transform", "translate(0,0)");

    // Criando o elemento de imagem para o fundo
    const bgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
    
    // Caminho para o seu arquivo externo
    bgImage.setAttributeNS(null, "href", "assets/cenario.svg"); 
    
    // Define as dimensões para cobrir todo o viewBox
    bgImage.setAttributeNS(null, "width", VW);
    bgImage.setAttributeNS(null, "height", VH);
    bgImage.setAttributeNS(null, "x", 0);
    bgImage.setAttributeNS(null, "y", 0);
    
    // Garante que a imagem se comporte como um fundo (cobrindo a área sem distorcer)
    bgImage.setAttributeNS(null, "preserveAspectRatio", "xMidYMid slice");

    panGroup.appendChild(bgImage);
},

    renderCharacters() {
        const { panGroup } = App.state;

        // Itera sobre o dicionário de personagens para desenhar todos os 3
        Object.entries(this.state.chars).forEach(([nome, info]) => {
            this.drawChar(panGroup, info.x, info.y, nome, info.color);
        });
    },

    drawRect(parent, x, y, w, h, fill) {
        const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        r.setAttribute("x", x); r.setAttribute("y", y);
        r.setAttribute("width", w); r.setAttribute("height", h);
        r.setAttribute("fill", fill);
        parent.appendChild(r);
    },

    drawChar(parent, x, y, label, color) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "char-instance");

        const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", x); c.setAttribute("cy", y - 40); // Sobe o círculo pro texto ficar no Y exato
        c.setAttribute("r", "45"); c.setAttribute("fill", color);

        const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.setAttribute("x", x); t.setAttribute("y", y + 35);
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("font-size", "28");
        t.setAttribute("fill", "#2c1e16");
        t.textContent = label;

        g.appendChild(c); g.appendChild(t);
        parent.appendChild(g);
    }
});

async renderBackground() {
        const { panGroup } = App.state;
        const VW = 1678;
        const VH = 937;

        panGroup.innerHTML = ''; 
        App.state.currentPan = {x: 0, y: 0};
        panGroup.setAttribute("transform", "translate(0,0)");

        const bgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        bgImage.setAttributeNS(null, "href", "assets/cenario_peru.svg"); 
        bgImage.setAttributeNS(null, "width", VW);
        bgImage.setAttributeNS(null, "height", VH);
        
        // O "meet" garante que a imagem caiba toda dentro do espaço sem ser cortada
        bgImage.setAttributeNS(null, "preserveAspectRatio", "xMidYMid meet");

        panGroup.appendChild(bgImage);
    }
});
