document.addEventListener("DOMContentLoaded", function() {
    
  const container = document.querySelector(".novidades");

  container.addEventListener("click", function() {
    // Encontra os cards PELA SUA POSIÇÃO ATUAL
    const topCard = document.querySelector(".stack-top");
    const middleCard = document.querySelector(".stack-middle");
    const bottomCard = document.querySelector(".stack-bottom");

    // Remove APENAS as classes de pilha
    topCard.classList.remove("stack-top");
    middleCard.classList.remove("stack-middle");
    bottomCard.classList.remove("stack-bottom");

    // Reatribui as classes de pilha na nova ordem
    topCard.classList.add("stack-bottom");     // O do topo vai para o fundo
    middleCard.classList.add("stack-top");     // O do meio vai para o topo
    bottomCard.classList.add("stack-middle");  // O do fundo vai para o meio
  });

});