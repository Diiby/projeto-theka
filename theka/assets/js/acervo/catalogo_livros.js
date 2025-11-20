document.addEventListener('DOMContentLoaded', () => {
    
    const containerLivros = document.getElementById("lista-livros");
    const apiUrlBase = "https://thekaapi.pythonanywhere.com"; 
    const apiUrlLivros = `${apiUrlBase}/livros/?page_size=100`;

    const modalVerLivro = document.getElementById('modal-ver-livro');
    const btnFecharVerLivro = document.getElementById('fechar-ver-livro');
    const modalViewCard = document.querySelector('#modal-ver-livro .modal-view-card');
    
    const btnEditarModal = document.getElementById('btn-editar-modal');
    const modalEditarMaterial = document.getElementById('modal-editar-material');
    const btnFecharEditarMaterial = document.getElementById('fechar-editar-material');
    const btnCancelarEditarMaterial = document.getElementById('cancelar-editar-material');
    const btnDeletarMaterial = document.getElementById('btn-deletar-material');

    // Campos Ver Mais
    const modalImg = document.getElementById('modal-img-capa');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalAutor = document.getElementById('modal-autor');
    const modalDescricao = document.getElementById('modal-descricao');
    const modalPaginas = document.getElementById('modal-paginas');
    const modalEditora = document.getElementById('modal-editora');

    // Campos Editar
    const editIdInput = document.getElementById('edit-id');
    const editCapaPreview = document.getElementById('edit-capa-preview');
    const editTitulo = document.getElementById('edit-titulo');
    const editAutor = document.getElementById('edit-autor');
    const editAno = document.getElementById('edit-ano');
    const editPaginas = document.getElementById('edit-paginas');
    const editISBN = document.getElementById('edit-isbn');
    const editResumo = document.getElementById('edit-resumo');
    const editEditoraSelect = document.getElementById('edit-editora');

    let clickCount = 0; 
    let currentBookData = {}; 
    let mapaEditoras = {};


    // FUNÇÃO HELPER
    function setSelectValueByText(selectId, valor) {
        const select = document.getElementById(selectId);
        if (!select || !valor) return;

        // Tenta selecionar pelo VALOR (ID) primeiro
        select.value = valor;

        // Se selecionou corretamente, para aqui.
        if (select.value == valor) return;

        //Se não deu, tenta pelo TEXTO (Nome)
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.toLowerCase() === valor.toString().toLowerCase()) {
                select.selectedIndex = i;
                return;
            }
        }

        const newOption = new Option(valor, valor, true, true);
        select.appendChild(newOption);
    }

    // CARREGAR EDITORAS DA API

    function carregarEditoras() {
        fetch(`${apiUrlBase}/editoras/`)
            .then(r => r.json())
            .then(dados => {
                const lista = dados.results || dados;
                if (editEditoraSelect) {
                    editEditoraSelect.innerHTML = '<option value="">Selecionar</option>';
                    lista.forEach(item => {
   
                        const nomeEhNumero = !isNaN(item.nome) && !isNaN(parseFloat(item.nome));
                        const nomeEhTeste = item.nome.toLowerCase().includes("teste");
                        if (nomeEhNumero || nomeEhTeste) return;

                        const option = document.createElement('option');
                        option.value = item.id;     // ID real
                        option.textContent = item.nome; // Nome real
                        editEditoraSelect.appendChild(option);

                        mapaEditoras[item.id] = item.nome;
                    });
                }
            })
            .catch(err => console.error("Erro editoras:", err));
    }
    carregarEditoras();

    // LISTAR LIVROS

    fetch(apiUrlLivros)
        .then(r => r.json())
        .then(dados => {
            const livros = dados.results;
            if(containerLivros) containerLivros.querySelectorAll(".items-book").forEach(i => i.remove());

            livros.forEach(livro => {
                const li = document.createElement("li");
                li.classList.add("items-book");
                const capa = livro.capa || 'img/acervo/CAPA LIVRO.png';
                // Tenta pegar o ID da editora
                const editoraValor = livro.editora || ""; 

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
                            data-editora="${editoraValor}" 
                            data-descricao="${livro.resumo || ''}"
                            data-imagem="${capa}">
                            <img src="img/acervo/icon_hover_livros.png" alt="Ver">
                        </a>
                    </div>
                `;
                containerLivros.appendChild(li);
            });
        });

    // ABRIR MODAL "VER MAIS"
    if(containerLivros) {
        containerLivros.addEventListener('click', (e) => {
            const botao = e.target.closest('.btn-ver-detalhes');
            if (botao) {
                e.preventDefault();
                clickCount = 0;
                if(modalViewCard) modalViewCard.classList.remove('edit-mode'); 

                currentBookData = { ...botao.dataset };

                modalImg.src = currentBookData.imagem;
                modalTitulo.textContent = currentBookData.titulo;
                modalAutor.textContent = `${currentBookData.autor}, ${currentBookData.ano}`;
                modalDescricao.textContent = currentBookData.descricao || "Sem resumo.";
                modalPaginas.textContent = currentBookData.paginas;

                if(modalEditora) {
                    const id = currentBookData.editora;

                    if(mapaEditoras[id]) {
                        modalEditora.textContent = mapaEditoras[id];
                    } else {
                        modalEditora.textContent = id || "Não informada";
                    }
                }

                modalVerLivro.classList.add('show');
                modalVerLivro.style.display = 'flex';
            }
        });
    }

    // Fechar Ver Mais
    const fecharModalVer = () => {
        modalVerLivro.classList.remove('show');
        modalVerLivro.style.display = 'none';
        if(modalViewCard) modalViewCard.classList.remove('edit-mode');
        clickCount = 0;
    };
    if(btnFecharVerLivro) btnFecharVerLivro.addEventListener('click', fecharModalVer);

    // Efeito Visual no Card
    if(modalVerLivro) {
        modalVerLivro.addEventListener('click', (e) => {
            const card = e.target.closest('.modal-view-card');
            const close = e.target.closest('#fechar-ver-livro');
            const edit = e.target.closest('#btn-editar-modal');
            if (card && !close && !edit) {
                clickCount++;
                if (clickCount >= 1) modalViewCard.classList.add('edit-mode');
            } else if (!card) fecharModalVer();
        });
    }


    // ABRIR MODAL "EDITAR"

    if(btnEditarModal) {

        btnEditarModal.addEventListener('click', () => {

            if(editIdInput) editIdInput.value = currentBookData.id;

            if(editCapaPreview) {
                editCapaPreview.src = currentBookData.imagem || 'img/acervo/CAPA LIVRO.png';
            }

            if(editTitulo) editTitulo.value = currentBookData.titulo || '';
            if(editAutor) editAutor.value = currentBookData.autor || '';
            if(editAno) editAno.value = currentBookData.ano || '';
            if(editPaginas) editPaginas.value = currentBookData.paginas || '';
            if(editISBN) editISBN.value = currentBookData.isbn || '';
            if(editResumo) editResumo.value = (currentBookData.descricao || '').trim();
            // Seleciona a Editora no Dropdown
            setSelectValueByText('edit-editora', currentBookData.editora);
            // Fecha o Ver Mais e abre o Editar
            fecharModalVer();

            if(modalEditarMaterial) {
                modalEditarMaterial.classList.add('show');
                modalEditarMaterial.style.display = 'flex';
            }
        });
    }

    // FECHAR MODAL "EDITAR"
    const fecharModalEditar = (e) => {
        if(e) e.preventDefault();
        if(modalEditarMaterial) {
            modalEditarMaterial.classList.remove('show');
            modalEditarMaterial.style.display = 'none';
        }
    };

    if(btnFecharEditarMaterial) btnFecharEditarMaterial.addEventListener('click', fecharModalEditar);
    if(btnCancelarEditarMaterial) btnCancelarEditarMaterial.addEventListener('click', fecharModalEditar);

    if(btnDeletarMaterial) {
        btnDeletarMaterial.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }
});