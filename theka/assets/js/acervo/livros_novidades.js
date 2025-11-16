document.addEventListener("DOMContentLoaded", function() {

    const todosItens = document.querySelectorAll(".item-galeria");

    todosItens.forEach(item => {
        item.addEventListener("click", function() {
            
            // Primeiro, remove a classe 'active' de QUEM ESTIVER ATIVO
            // Encontra o item que 'atualmente' tem a classe
            const itemAtivoAtual = document.querySelector(".item-galeria.active");
            if (itemAtivoAtual) {
                itemAtivoAtual.classList.remove("active");
            }
            
            // adiciona a classe 'active' APENAS no item que foi clicado
            item.classList.add("active");
        });
    });

});