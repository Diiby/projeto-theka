// Espera o HTML carregar antes de rodar o script
document.addEventListener("DOMContentLoaded", function() {
   
    // O botão que ABRE o modal (+)
    const botaoAbrir = document.querySelector(".btn-adicionar"); 
    
    // O modal (o overlay/fundo)
    const modal = document.getElementById("modal-adicionar");
    
    // Os botões que FECHAM o modal
    const botaoFecharX = document.getElementById("modal-fechar");
    const botaoCancelar = document.getElementById("btn-cancelar");


    // Verifica se o botão de abrir existe antes de adicionar o evento
    if (botaoAbrir) {
        botaoAbrir.addEventListener("click", function() {
            modal.classList.add("show");
        });
    }

    // Ação para FECHAR (clicando no "X")
    if (botaoFecharX) {
        botaoFecharX.addEventListener("click", function() {
            modal.classList.remove("show");
        });
    }
    
    // Ação para FECHAR (clicando em "Cancelar")
    if (botaoCancelar) {
        botaoCancelar.addEventListener("click", function() {
            modal.classList.remove("show");
        });
    }

    // Fechar clicando FORA da caixa branca
    if (modal) {
        modal.addEventListener("click", function(event) {
            // Se o clique foi no overlay (fundo) e não no conteúdo
            if (event.target === modal) {
                modal.classList.remove("show");
            }
        });
    }

});