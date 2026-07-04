document.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('orbit-stage');

    const personagens = [
        'img/bacon.svg',
        //'img/peru.svg',
        'img/hume.svg',
        'img/bacon.svg',
        'img/hume.svg'
    ];

    // dimensões do "retângulo" da órbita (metade da largura/altura) e raio dos cantos
    const hw = 120;
    const hh = 76;
    const cornerRadius = 76;
    const velocidade = 1.0;

    // se o sprite olha pra cima por padrão, use 90; se olha pra direita, use 0
    const offsetRotacao = 0;

    function pointOnRoundedRect(d, hw, hh, r) {
        const sw = hw - r;
        const sh = hh - r;
        const segs = [
            { type: 'line', len: 2 * sw, start: { x: -sw, y: -hh }, dir: { x: 1, y: 0 } },
            { type: 'arc',  len: (Math.PI / 2) * r, center: { x: sw, y: -sh }, a0: -Math.PI / 2 },
            { type: 'line', len: 2 * sh, start: { x: hw, y: -sh }, dir: { x: 0, y: 1 } },
            { type: 'arc',  len: (Math.PI / 2) * r, center: { x: sw, y: sh }, a0: 0 },
            { type: 'line', len: 2 * sw, start: { x: sw, y: hh }, dir: { x: -1, y: 0 } },
            { type: 'arc',  len: (Math.PI / 2) * r, center: { x: -sw, y: sh }, a0: Math.PI / 2 },
            { type: 'line', len: 2 * sh, start: { x: -hw, y: sh }, dir: { x: 0, y: -1 } },
            { type: 'arc',  len: (Math.PI / 2) * r, center: { x: -sw, y: -sh }, a0: Math.PI },
        ];
        const total = segs.reduce((s, seg) => s + seg.len, 0);
        let dd = ((d % total) + total) % total;

        for (const seg of segs) {
            if (dd <= seg.len) {
                if (seg.type === 'line') {
                    const x = seg.start.x + seg.dir.x * dd;
                    const y = seg.start.y + seg.dir.y * dd;
                    const angle = Math.atan2(seg.dir.y, seg.dir.x);
                    return { x, y, angle, total };
                } else {
                    const t = seg.a0 + dd / r;
                    const x = seg.center.x + r * Math.cos(t);
                    const y = seg.center.y + r * Math.sin(t);
                    const angle = t + Math.PI / 2;
                    return { x, y, angle, total };
                }
            }
            dd -= seg.len; 
        }
    }

    const itens = personagens.map((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'personagem';
        img.alt = `Personagem ${i + 1}`;
        stage.appendChild(img);
        return { img, offsetFrac: (i ) / personagens.length };
    });

    let dist = 0;
    const perimetroRef = pointOnRoundedRect(0, hw, hh, cornerRadius).total;

    function animar() {
        dist += velocidade;

        itens.forEach(({ img, offsetFrac }) => {
            const d = dist + (offsetFrac) * perimetroRef;
            const p = pointOnRoundedRect(d, hw, hh, cornerRadius);
            const graus = (p.angle * 180 / Math.PI) + offsetRotacao;

            img.style.transform = `translate(${p.x + hw + 10}px, ${p.y + hh/2 - 10}px) rotate(${graus}deg)`;
        });

        requestAnimationFrame(animar);
    }

    animar();
});