document.addEventListener("DOMContentLoaded", () => {
    const galeriaContainer = document.getElementById("galeria-livros");
    
    // Selecionar Titulo e Autor - Ano
    const tituloDestaque = document.querySelector(".text-novidades-2 h3");
    const infoDestaque = document.querySelector(".text-novidades-2 h4");

    fetch("https://thekaapi.pythonanywhere.com/livros/novidades/")
        .then(response => response.json())
        .then(livros => {
            galeriaContainer.innerHTML = "";

            livros.forEach((livro, index) => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("item-galeria");

                // LÓGICA DE INICIALIZAÇÃO
                if (index === 0) {
                    itemDiv.classList.add("active");
                    tituloDestaque.textContent = livro.titulo;
                    infoDestaque.textContent = `${livro.autor} - ${livro.ano_publicacao}`;
                }

                itemDiv.addEventListener("click", function() {
                    // Troca a classe Active visual
                    const itemAtivoAtual = document.querySelector(".item-galeria.active");
                    if (itemAtivoAtual) {
                        itemAtivoAtual.classList.remove("active");
                    }
                    itemDiv.classList.add("active");

                    // Atualiza o Texto ao lado
                    tituloDestaque.textContent = livro.titulo;
                    // Formata como "Autor - Ano"
                    infoDestaque.textContent = `${livro.autor} - ${livro.ano_publicacao}`;
                });

                // Criação das Imagens (Capa e Seta)
                const imgCapa = document.createElement("img");
                imgCapa.classList.add("capa-livro");
                imgCapa.src = livro.capa;
                imgCapa.alt = livro.titulo;

                const imgArrow = document.createElement("img");
                imgArrow.classList.add("arrow-right");
                imgArrow.src = "img/acervo/ArrowCircleUp.png"; 
                imgArrow.alt = "Ver detalhes";

                // Montagem
                itemDiv.appendChild(imgCapa);
                itemDiv.appendChild(imgArrow);
                galeriaContainer.appendChild(itemDiv);
            });
        })
        .catch(err => console.error("Erro ao carregar dados:", err));
});


