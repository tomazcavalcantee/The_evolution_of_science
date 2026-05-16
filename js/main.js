/**
 * main.js — Ponto de entrada da aplicação
 *
 * Único responsável por orquestrar a inicialização.
 * Não contém lógica própria — apenas chama os módulos na ordem certa.
 *
 * O flag `_appInitialized` evita dupla inicialização caso este arquivo
 * seja carregado mais de uma vez ou haja outro listener de DOMContentLoaded
 * em arquivos legados no projeto.
 */

if (!window._appInitialized) {
    window._appInitialized = true;

    document.addEventListener("DOMContentLoaded", () => {
        setupSVGStructure();      // graph.js — cria o pan-layer
        renderInitialStory();     // story.js — preenche o texto de intro
        renderGraph();            // graph.js — desenha nós e arestas
        setupInteractionEvents(); // interaction.js — ativa drag e pan
    });
}