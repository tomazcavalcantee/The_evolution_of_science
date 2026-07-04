# Epistemologia Interativa — O Mapa Epistêmico

Aplicação web interativa que apresenta disputas históricas da epistemologia da ciência através de um mapa navegável com filósofos arrastáveis e cenas de debate.

Para explorar, dê `git clone` no repositório e abra o `index.html` no navegador.

---

## Estrutura de arquivos

```
epistemologia/
│
├── index.html              # Página principal
├── chapters.json           # Registro de todos os capítulos (metadados)
│
├── css/
│   └── style.css           # Toda a aparência visual (cores, fontes, layout)
│
├── js/
│   ├── state.js            # Estado compartilhado (namespace App)
│   ├── data.js             # ★ EDITE AQUI para mudar o mapa
│   │                         Define filósofos, conexões e textos
│   ├── chapter_engine.js   # Motor compartilhado de capítulos (ChapterEngine)
│   ├── graph.js            # Desenha o mapa SVG + legenda
│   ├── story.js            # Controla o painel de texto lateral
│   ├── interaction.js      # Drag dos filósofos e pan do mapa
│   └── main.js             # Inicializa tudo na ordem certa
│
├── chapters/
│   ├── _template.js        # ★ COPIE ESTE para criar um novo capítulo
│   ├── cap_peru.js         # Capítulo: O Peru de Russell (implementado)
│   ├── cap_demarcacao.js   # Capítulo: Popper vs. Thagard (stub)
│   ├── cap_demarcacao_kuhn.js # Capítulo: Popper vs. Kuhn (stub)
│   ├── cap_gettier.js      # Capítulo: O Problema de Gettier (stub)
│   ├── cap_metodo.js       # Capítulo: Dedução vs. Indução (stub)
│   ├── cap_observacao.js   # Capítulo: A Observação não é Neutra (stub)
│   └── cap_positivismo.js  # Capítulo: O Ápice Empirista (stub)
│
└── imgs/                   # Assets SVG dos personagens e cenários
```

## Como criar um novo capítulo

1. Copie `chapters/_template.js` para `chapters/cap_meu_tema.js`
2. Substitua `"cap_meu_tema"` pelo seu `chapterId`
3. Preencha `title`, e opcionalmente `background`, `chars` e `story`
4. Adicione o `<script>` em `index.html` (antes de `graph.js`)
5. Adicione a aresta em `data.js` com `chapterId: "cap_meu_tema"`
6. Atualize `chapters.json` com os metadados

### Exemplo mínimo (stub)

```js
App.registerChapter("cap_meu_tema", {
    id: "cap_meu_tema",
    title: "Título do Debate",
    start(container) {
        this.engine = new ChapterEngine(this, container);
        this.engine.start();
    },
});
```

O `ChapterEngine` cuida automaticamente de:
- Botão "Voltar ao Mapa"
- Sistema de diálogo (se `story` estiver definido)
- Cena SVG com personagens (se `chars` e `background` estiverem definidos)
- Highlight do personagem falante
- Navegação anterior/próximo no diálogo

## Tecnologias usadas

O projeto usa apenas HTML, CSS e JavaScript puros — sem frameworks, sem instalação, sem compilação. O mapa é desenhado com SVG nativo do navegador.

| Tecnologia | Uso |
|---|---|
| HTML / SVG | Estrutura da página e desenho do mapa |
| CSS | Estilo visual, animações |
| JavaScript | Lógica de interação, drag e narrativa |
