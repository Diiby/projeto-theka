document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://thekaapi.pythonanywhere.com/livros/";

    const btnSalvarEditar = document.querySelector('#modal-editar-material .btn-salvar');
    const btnDeletar = document.getElementById('btn-deletar-material');

    // EDITAR
    if (btnSalvarEditar) {
        btnSalvarEditar.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Salvando edição...");

            const idLivro = document.getElementById('edit-id').value;
            if (!idLivro) return alert("Erro: ID do livro perdido. Recarregue a página.");

            const formData = new FormData();
            formData.append('titulo', document.getElementById('edit-titulo').value);
            formData.append('autor', document.getElementById('edit-autor').value);
            formData.append('ano_publicacao', document.getElementById('edit-ano').value);
            formData.append('numero_paginas', document.getElementById('edit-paginas').value);
            formData.append('isbn', document.getElementById('edit-isbn').value);
            formData.append('resumo', document.getElementById('edit-resumo').value);
            
            // PEGA O ID DA EDITORA
            const editoraId = document.getElementById('edit-editora').value;
            // Se tem ID numérico, envia 'editora'. Se não, tenta enviar 'editora_nome' por garantia ou avisa.
            if (editoraId && !isNaN(editoraId)) {
                formData.append('editora', editoraId);
            } else {
                console.warn("Aviso: Editora inválida ou não selecionada.");
            }

            // Imagem (se trocou)
            const inputCapa = document.getElementById('edit-capa-input');
            if (inputCapa && inputCapa.files[0]) {
                formData.append('capa', inputCapa.files[0]);
            }

            fetch(`${apiUrl}${idLivro}/`, {
                method: 'PATCH',
                body: formData
            })
            .then(async r => {
                if (r.ok) {
                    alert("Livro atualizado!");
                    window.location.reload();
                } else {
                    const erro = await r.json();
                    console.error("Erro API:", erro);
                    alert("Erro ao atualizar: " + JSON.stringify(erro));
                }
            })
            .catch(err => {
                console.error("Erro rede:", err);
                alert("Erro de conexão.");
            });
        });
    }

    // DELETAR
    if (btnDeletar) {
        btnDeletar.onclick = (e) => {
            e.preventDefault();
            const idLivro = document.getElementById('edit-id').value;
            
            if(confirm("Tem certeza que deseja excluir este livro?")) {
                fetch(`${apiUrl}${idLivro}/`, { method: 'DELETE' })
                .then(r => {
                    if (r.ok || r.status === 204) {
                        alert("Livro excluído!");
                        window.location.reload();
                    } else {
                        alert("Erro ao excluir.");
                    }
                })
                .catch(err => console.error("Erro delete:", err));
            }
        };
    }
});