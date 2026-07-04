# Epistemologia Interativa — O Mapa Epistêmico

Aplicação web educacional interativa que apresenta disputas históricas da filosofia do conhecimento através de um mapa navegável com filósofos arrastáveis e cenas de debate.

---

## Como rodar

Não é necessário instalar nada. Abra o arquivo `index.html` diretamente no navegador.

> ⚠️ Alguns navegadores bloqueiam scripts locais por segurança. Se o mapa aparecer em branco, use uma das opções abaixo:
> - **VS Code**: instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), clique com o botão direito em `index.html` → *Open with Live Server*
> - **Terminal**: `python3 -m http.server` na pasta do projeto, depois acesse `http://localhost:8000`

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

**Regra prática:** na grande maioria dos casos, você só vai tocar em `data.js` e nos arquivos da pasta `chapters/`.

---

## Como adicionar um filósofo ao mapa

Abra `js/data.js` e adicione um objeto ao array `gameData.nodes`:

```js
{ id: "kant", label: "Immanuel Kant", x: 400, y: 300, color: "#8e44ad" }
```

| Campo   | O que é                                              |
|---------|------------------------------------------------------|
| `id`    | Nome interno único, sem espaços (use só letras e `_`) |
| `label` | Nome que aparece abaixo do bonequinho na tela        |
| `x`, `y`| Posição inicial no mapa (largura 0–1000, altura 0–800)|
| `color` | Cor do bonequinho em hexadecimal                    |

---

## Como adicionar uma disputa (conexão entre filósofos)

**Passo 1 —** Em `js/data.js`, adicione um objeto ao array `gameData.edges`:

```js
{
    id: "edge_critica",
    source: "kant",           // id do filósofo de origem
    target: "popper",         // id do filósofo de destino
    title: "A Crítica da Razão Pura",
    desc: "Descrição breve da disputa que aparece no painel lateral.",
    chapterId: "cap_critica", // deve ser igual ao nome do arquivo do capítulo
    icon: Icons.demarcacao,   // ícone do botão — reaproveite um existente ou crie em Icons
}
```

**Passo 2 —** Crie o arquivo do capítulo copiando o template:

```
chapters/_template.js  →  copie e renomeie para  chapters/cap_critica.js
```

Dentro do novo arquivo, troque `"cap_meu_tema"` pelo seu `chapterId` e implemente a cena no método `start(container)`.

**Passo 3 —** Registre o novo arquivo em dois lugares:

Em `index.html`, adicione a linha dentro do bloco de capítulos:
```html
<script src="chapters/cap_critica.js"></script>
```

Em `chapters.json`, adicione uma entrada no array `chapters`:
```json
{
    "id": "cap_critica",
    "title": "A Crítica da Razão Pura",
    "edgeId": "edge_critica",
    "status": "in-progress",
    "author": "Seu Nome",
    "description": "Descrição do que o capítulo deve cobrir.",
    "notes": ""
}
```

---

## Como funciona um capítulo

Cada arquivo em `chapters/` é uma cena interativa independente. A estrutura mínima é:

```js
App.registerChapter("cap_meu_capitulo", {
    start(container) {
        // `container` é o painel de texto na direita da tela.
        // Escreva HTML aqui para montar sua cena.
        container.innerHTML = `
            <h3>Título da cena</h3>
            <p>Texto introdutório...</p>
        `;
    }
});
```

O método `start` é chamado automaticamente quando o usuário clica em **Iniciar Debate**. Você pode criar botões de escolha, textos que aparecem progressivamente, ou qualquer outra interação dentro do `container`.

---

## Ordem de carregamento dos scripts

O `index.html` carrega os arquivos em uma ordem específica que não deve ser alterada:

```
1. state.js      → cria o objeto App (deve ser o primeiro)
2. data.js       → define gameData e Icons
3. chapters/*.js → cada capítulo se registra em App
4. graph.js      → motor de renderização SVG
5. story.js      → motor do painel narrativo
6. interaction.js→ motor de drag e pan
7. main.js       → dispara a inicialização
```

Se você adicionar um novo arquivo de capítulo, coloque o `<script>` dele **entre** `data.js` e `graph.js`.

---

## Tecnologias usadas

O projeto usa apenas HTML, CSS e JavaScript puros — sem frameworks, sem instalação, sem compilação. O mapa é desenhado com SVG nativo do navegador.

| Tecnologia | Uso |
|---|---|
| HTML / SVG | Estrutura da página e desenho do mapa |
| CSS | Estilo visual (paleta de papiro, animações) |
| JavaScript | Lógica de interação, drag, pan e narrativa |
| Google Fonts | Tipografia (Crimson Text, Cinzel) |
