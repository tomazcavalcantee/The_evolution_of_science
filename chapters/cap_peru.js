/**
 * cap_peru.js — O Peru de Russell (Indutivismo vs. Empiricismo)
 *
 * TODO: Implementar a cena interativa do debate.
 *       Consulte chapters/_template.js para o passo a passo.
 */

App.registerChapter("cap_peru", {
    start(container) {
        // Agora 'container' é o 'chapter-ui', que está vazio e ocupa a lateral inteira.
        
        container.innerHTML = `
            <h2>O Peru Indutivista</h2>
            <p>
                Bem-vindo à fazenda. 
                Se algo acontece repetidas vezes, é uma lei da natureza, certo?
            </p>
            
            <div id="peru-game-area" style="padding: 20px; background: #fff; border: 2px dashed #ccc; margin: 20px 0;">
                <p style="text-align: center;">[ dá pra fazer alguma coisa aqui :O ]</p>
            </div>

            <button id="btn-back-map" class="btn-choice"> Voltar ao Mapa</button>
        `;

        // Lógica para voltar ao mapa
        const btnBack = document.getElementById('btn-back-map');
        btnBack.addEventListener('click', () => {
            // 1. Alterna a interface de texto
            document.getElementById('chapter-ui').style.display = 'none';
            document.getElementById('map-ui').style.display = 'block';
            
            // 2. Apaga a fazendinha e redesenha os filósofos e as linhas!
            renderGraph();
        });

        this.renderBackground();
    },

    async renderBackground() {
        const { panGroup } = App.state;
        const svg = document.getElementById('graph-container');

        panGroup.classList.remove('fade-out');
        void panGroup.offsetWidth; // Trick para reiniciar a animação CSS
        panGroup.classList.add('fade-out');
        
        // Guard: remove tudo exceto o bg-rect antes de redesenhar
        await new Promise(resolve => setTimeout(resolve, 500)); // Aguarda a animação terminar

        const bgRect = document.getElementById('map-bg-capture');

        panGroup.innerHTML = '';
        panGroup.classList.remove('fade-out');
        
        if (bgRect) panGroup.appendChild(bgRect);

        // Reinicia a posição da câmera
        App.state.currentPan = {x: 0, y: 0};
        panGroup.setAttribute(
            "transform",
            `translate(${App.state.currentPan.x}, ${App.state.currentPan.y})`
        );

        // Desenha o cenário de fundo
        const { x, y, width, height } = svg.getBBox();
        const padding = 5;
        const groundHeight = 250;

        const sky = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        sky.setAttribute("x", x);
        sky.setAttribute("y", y - padding);
        sky.setAttribute("width", width);
        sky.setAttribute("height", height - groundHeight + padding);
        sky.setAttribute("fill", "#8ecae6");
        
        const ground = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        ground.setAttribute("x", x);
        ground.setAttribute("y", height - groundHeight);
        ground.setAttribute("width", width);
        ground.setAttribute("height", groundHeight + padding);
        ground.setAttribute("fill", "#6a994e");
        
        const sun = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        sun.setAttribute("cx", width - 60);
        sun.setAttribute("cy", 60);
        sun.setAttribute("r", 50);
        sun.setAttribute("fill", "#f4d35e");

        panGroup.appendChild(sky);
        panGroup.appendChild(ground);
        panGroup.appendChild(sun);

        panGroup.classList.remove('fade-in');
        void panGroup.offsetWidth; // Trick para reiniciar a animação CSS
        panGroup.classList.add('fade-in');
    },
});
