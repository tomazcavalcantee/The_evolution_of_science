# Epistemologia Interativa — O Mapa Epistêmico

Aplicação web interativa que apresenta disputas históricas da epistemologia da ciência através de um mapa navegável com filósofos arrastáveis e cenas de debate.

Para explorar, dê `gitclone` no repositório e abra o `index.html` no navegador.

---

## Estrutura de arquivos

```
epistemologia/
│
├── index.html              # Página principal — não edite a menos que precise
│                             adicionar um novo arquivo .js
│
├── chapters.json           # Registro de todos os capítulos (veja abaixo)
│
├── css/
│   └── style.css           # Toda a aparência visual (cores, fontes, layout)
│
├── js/
│   ├── data.js             # ★ EDITE AQUI para mudar o mapa
│   │                         Define filósofos, conexões e textos
│   ├── state.js            # Estado compartilhado entre os módulos (não edite)
│   ├── graph.js            # Desenha o mapa SVG (não edite)
│   ├── story.js            # Controla o painel de texto lateral (não edite)
│   ├── interaction.js      # Drag dos filósofos e pan do mapa (não edite)
│   └── main.js             # Inicializa tudo na ordem certa (não edite)
│
└── chapters/
    ├── _template.js        # ★ COPIE ESTE para criar um novo capítulo
    ├── cap_demarcacao.js   # Capítulo: Popper vs. Thagard
    ├── cap_peru.js         # Capítulo: O Peru de Russell
    └── cap_revolucoes.js   # Capítulo: Popper vs. Kuhn
```

## Tecnologias usadas

O projeto usa apenas HTML, CSS e JavaScript puros — sem frameworks, sem instalação, sem compilação. O mapa é desenhado com SVG nativo do navegador.

| Tecnologia | Uso |
|---|---|
| HTML / SVG | Estrutura da página e desenho do mapa |
| CSS | Estilo visual, animações) |
| JavaScript | Lógica de interação, drag e narrativa |
