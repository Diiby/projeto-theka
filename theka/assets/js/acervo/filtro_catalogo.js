document.addEventListener("DOMContentLoaded", () => {
    console.log("Carregando sistema de filtros...");

    const apiUrlBase = "https://thekaapi.pythonanywhere.com";
    const containerLivros = document.getElementById("lista-livros");

    const inputTexto = document.getElementById('filtro-texto');
    const selectGenero = document.getElementById('filtro-genero');
    const selectEditora = document.getElementById('filtro-editora');
    const btnBuscar = document.getElementById('btn-buscar-filtros');
    const btnBuscarMobile = document.getElementById('btn-buscar-mobile');

    // PREENCHER DROPDOWNS DO FILTRO
    function carregarOpcoesFiltro() {
        // Editoras
        fetch(`${apiUrlBase}/editoras/`).then(r => r.json()).then(dados => {
            const lista = dados.results || dados;
            if(selectEditora) {
                selectEditora.innerHTML = '<option value="">Todas as Editoras</option>';
                lista.forEach(item => {
                    if ((!isNaN(item.nome) && !isNaN(parseFloat(item.nome))) || item.nome.includes("teste")) return;
                    selectEditora.innerHTML += `<option value="${item.id}">${item.nome}</option>`;
                });
            }
        });

        // Gêneros
        fetch(`${apiUrlBase}/generos/`).then(r => r.json()).then(dados => {
            const lista = dados.results || dados;
            if(selectGenero) {
                selectGenero.innerHTML = '<option value="">Todos os Gêneros</option>';
                lista.forEach(item => {
                    if ((!isNaN(item.nome) && !isNaN(parseFloat(item.nome))) || item.nome.includes("teste")) return;
                    selectGenero.innerHTML += `<option value="${item.id}">${item.nome}</option>`;
                });
            }
        });
    }
    carregarOpcoesFiltro();

    //FUNÇÃO DE FILTRAR E RENDERIZAR
    function realizarBusca() {
        const termo = inputTexto.value.toLowerCase().trim();
        const idEd = selectEditora.value;
        const idGen = selectGenero.value;

        console.log(`Buscando: Texto="${termo}", EditoraID="${idEd}", GeneroID="${idGen}"`);

        // Busca todos os livros de novo
        fetch(`${apiUrlBase}/livros/?page_size=100`)
            .then(r => r.json())
            .then(dados => {
                const todosLivros = dados.results;
                
                // FILTRAGEM
                const livrosFiltrados = todosLivros.filter(livro => {

                    const matchTexto = !termo || 
                        (livro.titulo && livro.titulo.toLowerCase().includes(termo)) || 
                        (livro.autor && livro.autor.toLowerCase().includes(termo));
                    
                    // Editora (ID vs ID)
                    const matchEditora = !idEd || (livro.editora == idEd);
                    
                    // Gênero (ID vs ID)
                    const matchGenero = !idGen || (livro.genero == idGen);

                    return matchTexto && matchEditora && matchGenero;
                });

                console.log(`Encontrados: ${livrosFiltrados.length}`);
                renderizarNaTela(livrosFiltrados);
            })
            .catch(e => console.error("Erro na busca:", e));
    }

    // DESENHAR NA TELA
    function renderizarNaTela(lista) {
        // Limpa a lista atual
        containerLivros.querySelectorAll(".items-book").forEach(i => i.remove());

        if (lista.length === 0) {
            return;
        }

        lista.forEach(livro => {
            const li = document.createElement("li");
            li.classList.add("items-book");
            const capa = livro.capa || 'img/acervo/CAPA LIVRO.png';
            const editoraId = livro.editora || "";

            li.innerHTML = `
                <img src="${capa}" alt="${livro.titulo}" onerror="this.src='img/acervo/CAPA LIVRO.png'">
                <div class="book-overlay">
                    <div class="book-overlay-info">
                        <h3>${livro.titulo}</h3>
                        <p>${livro.autor}, ${livro.ano_publicacao}</p>
                    </div>
                    <a href="#" class="book-overlay-btn btn-ver-detalhes"
                        data-id="${livro.id}"
                        data-titulo="${livro.titulo}"
                        data-autor="${livro.autor}"
                        data-ano="${livro.ano_publicacao}"
                        data-paginas="${livro.numero_paginas}"
                        data-isbn="${livro.isbn}"
                        data-editora="${editoraId}" 
                        data-descricao="${livro.resumo || ''}"
                        data-imagem="${capa}">
                        <img src="img/acervo/icon_hover_livros.png" alt="Ver">
                    </a>
                </div>
            `;
            containerLivros.appendChild(li);
        });
    }

    // Event Listeners
    if(btnBuscar) btnBuscar.addEventListener('click', (e) => { e.preventDefault(); realizarBusca(); });
    if(btnBuscarMobile) btnBuscarMobile.addEventListener('click', (e) => { e.preventDefault(); realizarBusca(); });
    if(inputTexto) inputTexto.addEventListener('keyup', (e) => { if(e.key === 'Enter') realizarBusca(); });
});