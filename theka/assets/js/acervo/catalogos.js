function alterarActive() {
    btnActive.forEach(function (btnAtivos) {
        btnAtivos.classList.remove('active')
    })
}

document.addEventListener("DOMContentLoaded", function() {

    // Pega os dois elementos que precisamos
    const filtroButton = document.getElementById("filtro-toggle-btn");
    const filtrosMenu = document.getElementById("filtros-dropdown");

    // clique NO BOTÃO DE FILTRO
    filtroButton.addEventListener("click", function(event) {
        event.stopPropagation(); 
        
        // Adiciona ou remove a classe "show" do menu de selects
        filtrosMenu.classList.toggle("show");
    });

    // Fecha o menu se clicar fora dele
    window.addEventListener("click", function(event) {
        // Se o menu estiver aberto E o clique NÃO for dentro do menu
        if (filtrosMenu.classList.contains("show") && !filtrosMenu.contains(event.target)) {
            filtrosMenu.classList.remove("show");
        }
    });
});

