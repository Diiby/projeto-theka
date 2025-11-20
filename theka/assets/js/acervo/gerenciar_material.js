document.addEventListener("DOMContentLoaded", () => {
    console.log("--- INICIANDO GERENCIADOR DE MATERIAL ---");

    const apiUrlBase = "https://thekaapi.pythonanywhere.com";
    const apiUrlLivros = `${apiUrlBase}/livros/`;

    function carregarEditorasAdicionar() {
        // Busca pelo ID único 'add-editora'
        const selectEditora = document.getElementById('add-editora'); 
        
        if (!selectEditora) {
            console.error("ERRO: Não encontrei o select com id='add-editora' no HTML.");
            return;
        }

        console.log("Buscando editoras na API para o modal adicionar...");

        fetch(`${apiUrlBase}/editoras/`)
            .then(response => response.json())
            .then(dados => {
                const lista = dados.results || dados;
                
                selectEditora.innerHTML = '<option value="">Selecionar Editora</option>';

                lista.forEach(item => {
                    const nomeEhNumero = !isNaN(item.nome) && !isNaN(parseFloat(item.nome));
                    const nomeEhTeste = item.nome.toLowerCase().includes("teste");
                    
                    if (nomeEhNumero || nomeEhTeste) return; 

                    const option = document.createElement('option');
                    option.value = item.id;     
                    option.textContent = item.nome; 
                    selectEditora.appendChild(option);
                });
                console.log("Editoras carregadas no modal adicionar!");
            })
            .catch(err => {
                console.error("Erro ao carregar editoras:", err);
                selectEditora.innerHTML = '<option value="">Erro ao carregar</option>';
            });
    }
    
    carregarEditorasAdicionar();

    // LÓGICA VISUAL: PREVIEW DA CAPA

    const btnTriggerAdd = document.getElementById('btn-trigger-add-capa');
    const inputAdd = document.getElementById('add-capa-input');
    const previewAdd = document.getElementById('add-capa-preview');

    if (btnTriggerAdd && inputAdd && previewAdd) {
        btnTriggerAdd.addEventListener('click', (e) => {
            e.preventDefault();
            inputAdd.click();
        });

        inputAdd.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => { previewAdd.src = e.target.result; };
                reader.readAsDataURL(file);
            }
        });
    }

    // SALVAR NOVO LIVRO
    const btnSalvarNovo = document.querySelector('#modal-adicionar .btn-salvar');

    if (btnSalvarNovo) {
        btnSalvarNovo.addEventListener("click", (e) => {
            e.preventDefault();
            
            const titulo = document.getElementById('titulo').value;
            const autor = document.getElementById('autor').value;
            
            const editora = document.getElementById('add-editora').value; 
            
            if (!titulo || !autor) return alert("Preencha Título e Autor.");
            if (!editora) return alert("Selecione uma Editora.");

            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('autor', autor);
            formData.append('isbn', document.getElementById('isbn').value);
            formData.append('resumo', document.getElementById('resumo').value);
            
            // Envia o ID da editora
            formData.append('editora', editora);
            formData.append('genero', 1); 

            formData.append('numero_paginas', parseInt(document.getElementById('paginas').value) || 0); 
            formData.append('ano_publicacao', parseInt(document.getElementById('ano').value) || 0);     

            if (inputAdd && inputAdd.files[0]) {
                formData.append('capa', inputAdd.files[0]);
            }

            fetch(apiUrlLivros, { method: 'POST', body: formData })
            .then(async response => {
                if (response.ok) {
                    alert("Sucesso! Livro adicionado.");
                    window.location.reload();
                } else {
                    const erroData = await response.json();
                    alert("Erro na API: " + JSON.stringify(erroData));
                }
            })
            .catch(error => alert("Erro de conexão."));
        });
    }
});