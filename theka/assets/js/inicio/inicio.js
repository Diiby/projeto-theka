document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".novidades");

    fetch("https://thekaapi.pythonanywhere.com/livros/novidades/")
        .then(response => response.json())
        .then(livros => {
            container.innerHTML = "";

            livros.slice(0, 3).forEach((livro, index) => {
                const img = document.createElement("img");
                img.src = livro.capa;
                img.alt = livro.titulo;


                if (index === 0) img.className = "img-3 stack-top";
                if (index === 1) img.className = "img-2 stack-middle";
                if (index === 2) img.className = "img-1 stack-bottom";

                container.appendChild(img);
            });
        })
        .catch(err => console.error("Erro ao carregar livros:", err));
});