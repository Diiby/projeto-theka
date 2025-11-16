document.addEventListener('DOMContentLoaded', () => {
    // Modal "Ver Mais"
    const modalVerLivro = document.getElementById('modal-ver-livro');
    const btnFecharVerLivro = document.getElementById('fechar-ver-livro');
    const modalViewCard = document.querySelector('#modal-ver-livro .modal-view-card');
    const botoesVerDetalhes = document.querySelectorAll('.btn-ver-detalhes');
    const btnEditarModal = document.getElementById('btn-editar-modal');

    // Campos do modal "Ver Mais"
    const modalImg = document.getElementById('modal-img-capa');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalAutor = document.getElementById('modal-autor');
    const modalDescricao = document.getElementById('modal-descricao');
    const modalPaginas = document.getElementById('modal-paginas');
    const modalEditora = document.getElementById('modal-editora');

    // Modal "Editar Material"
    const modalEditarMaterial = document.getElementById('modal-editar-material');
    const btnFecharEditarMaterial = document.getElementById('fechar-editar-material');
    const btnCancelarEditarMaterial = document.getElementById('cancelar-editar-material');
    const btnDeletarMaterial = document.getElementById('btn-deletar-material');

    // Campos do formulário "Editar"
    const editCapaPreview = document.getElementById('edit-capa-preview');
    const editTitulo = document.getElementById('edit-titulo');
    const editPaginas = document.getElementById('edit-paginas');
    const editISBN = document.getElementById('edit-isbn');
    const editAutor = document.getElementById('edit-autor');
    const editAno = document.getElementById('edit-ano');
    const editEditora = document.getElementById('edit-editora');
    const editResumo = document.getElementById('edit-resumo');

    let clickCount = 0; 
    let currentBookData = {}; // Guarda os dados do livro clicado

    // Preenche um <select> pelo texto ou valor
    function setSelectValueByText(selectId, text) {
        const select = document.getElementById(selectId);
        if (!select || !text) return; // Proteção contra nulos

        // Tenta encontrar pelo texto
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.toLowerCase() === text.toLowerCase()) {
                select.selectedIndex = i;
                return;
            }
        }
        
        // Se não achar, tenta pelo valor (caso o 'data-editora' seja o 'value')
        select.value = text;

        // Se ainda assim não achar (e for um valor válido), cria uma nova option
        if (select.value !== text) {
            console.warn(`Editora "${text}" não encontrada. Adicionando temporariamente.`);
            const newOption = new Option(text, text, true, true);
            select.appendChild(newOption);
        }
    }


    // MODAL "VER MAIS"

    //Abrir o "Ver Mais"
    botoesVerDetalhes.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault(); 
            clickCount = 0; 
            
            // Garante que o cartão exista antes de remover a classe
            if(modalViewCard) {
                modalViewCard.classList.remove('edit-mode'); 
            }

            // Armazena TODOS os dados do livro
            currentBookData = {
                imagem: botao.getAttribute('data-imagem'),
                titulo: botao.getAttribute('data-titulo'),
                autor: botao.getAttribute('data-autor'),
                descricao: botao.getAttribute('data-descricao'),
                paginas: botao.getAttribute('data-paginas'),
                editora: botao.getAttribute('data-editora'),
                isbn: botao.getAttribute('data-isbn'),
                ano: botao.getAttribute('data-ano')
            };

            // Preenche o modal "Ver Mais"
            if(modalImg) modalImg.src = currentBookData.imagem;
            if(modalTitulo) modalTitulo.textContent = currentBookData.titulo;
            if(modalAutor) modalAutor.textContent = `${currentBookData.autor || ''}, ${currentBookData.ano || ''}`; 
            if(modalDescricao) modalDescricao.textContent = currentBookData.descricao;
            if(modalPaginas) modalPaginas.textContent = currentBookData.paginas;
            if(modalEditora) modalEditora.textContent = currentBookData.editora;

            if(modalVerLivro) modalVerLivro.classList.add('show');
        });
    });

    // Mostrar/Fechar "Ver Mais" e ativar "edit-mode"
    if(modalVerLivro) {
        modalVerLivro.addEventListener('click', (e) => {
            const clickedInsideCard = e.target.closest('.modal-view-card');
            const clickedOnCloseButton = e.target.closest('#fechar-ver-livro');
            const clickedOnEditButton = e.target.closest('#btn-editar-modal');

            if (clickedInsideCard && !clickedOnCloseButton && !clickedOnEditButton) {
                clickCount++;
                if (clickCount >= 1 && modalViewCard) { // Ativa no primeiro clique dentro
                    modalViewCard.classList.add('edit-mode');
                }
            } else if (!clickedInsideCard && e.target === modalVerLivro) {
                modalVerLivro.classList.remove('show');
                if(modalViewCard) modalViewCard.classList.remove('edit-mode'); 
                clickCount = 0; 
            }
        });
    }

    //Fechar "Ver Mais" (Botão X)
    if(btnFecharVerLivro) {
        btnFecharVerLivro.addEventListener('click', () => {
            if(modalVerLivro) modalVerLivro.classList.remove('show');
            if(modalViewCard) modalViewCard.classList.remove('edit-mode'); 
            clickCount = 0; 
        });
    }


    // MODAL "EDITAR"

    // Abrir o "Editar" (clicando no botão "Editar")
    if(btnEditarModal) {
        btnEditarModal.addEventListener('click', () => {
            
            // Preenche o formulário de EDIÇÃO com os dados guardados
            if(editCapaPreview) editCapaPreview.src = currentBookData.imagem || '';
            if(editTitulo) editTitulo.value = currentBookData.titulo || '';
            if(editAutor) editAutor.value = currentBookData.autor || '';
            if(editAno) editAno.value = currentBookData.ano || '';
            if(editPaginas) editPaginas.value = currentBookData.paginas || '';
            if(editISBN) editISBN.value = currentBookData.isbn || ''; 
            if(editResumo) editResumo.value = (currentBookData.descricao || '').trim();
            
            // Usa a função helper para a editora
            setSelectValueByText('edit-editora', currentBookData.editora);

            // Fecha o modal "Ver Mais"
            if(modalVerLivro) modalVerLivro.classList.remove('show');
            if(modalViewCard) modalViewCard.classList.remove('edit-mode');
            clickCount = 0;

            // Abre o modal "Editar"
            if(modalEditarMaterial) modalEditarMaterial.classList.add('show');
        });
    }

    // Fechar "Editar" (Botão X)
    if(btnFecharEditarMaterial) {
        btnFecharEditarMaterial.addEventListener('click', () => {
            if(modalEditarMaterial) modalEditarMaterial.classList.remove('show');
        });
    }

    // Fechar "Editar" (Botão Cancelar)
    if(btnCancelarEditarMaterial) {
        btnCancelarEditarMaterial.addEventListener('click', (e) => {
            e.preventDefault(); // Previne submit do formulário
            if(modalEditarMaterial) modalEditarMaterial.classList.remove('show');
        });
    }

    // Ação de Deletar
    if(btnDeletarMaterial) {
        btnDeletarMaterial.addEventListener('click', (e) => {
            e.preventDefault(); // Previne submit do formulário
            
            // Confirmação antes de deletar
            if (confirm(`Tem certeza que deseja deletar "${currentBookData.titulo}"?`)) {
                alert('Material deletado!');
                // Add Aqui a lógica para deletar o item do banco de dados
                if(modalEditarMaterial) modalEditarMaterial.classList.remove('show'); // Fecha o modal
            }
        });
    }

});