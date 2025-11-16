document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELEÇÃO DOS ELEMENTOS ---
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const toggleSenhaButton = document.getElementById('toggleSenha'); // Botão do "olho"

    // --- 2. LÓGICA DE SUBMIT DO LOGIN ---
    loginForm.addEventListener('submit', async (event) => {
        // Impede que o formulário seja enviado da forma tradicional
        event.preventDefault(); 

        // Captura os valores dos inputs
        const email = emailInput.value;
        const senha = passwordInput.value;

        // para não enviar dados vazios
        if (!email || !senha) {
            alert('Por favor, preencha o e-mail e a senha.');
            return;
        }

        // Busca "GET" o usuário pelo e-mail
        try {
            const response = await fetch(`http://localhost:3000/usuarios?email=${email}`);
            
            if (!response.ok) {
                throw new Error('Erro ao conectar com o servidor.');
            }

            const usuarios = await response.json();

            // Verifica se o usuário existe e se a senha está correta
            if (usuarios.length === 0) {
                // Usuário NÃO encontrado
                alert('E-mail ou senha inválidos.');
                return;
            }

            const usuario = usuarios[0]; 

            if (usuario.senha === senha) {
                // SUCESSO! Senha correta.

                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                // Redireciona para a tela inicial
                alert('Login bem-sucedido!');

                window.location.href = '/inicio.html';

            } else {
                // Senha INCORRETA
                alert('E-mail ou senha inválidos.');
            }

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Falha na comunicação com o servidor. Tente novamente.');
        }
        
    });
    
    // MOSTRAR/ESCONDER SENHA
    if (toggleSenhaButton) {
        toggleSenhaButton.addEventListener('click', () => {
        
            // Verifica o 'type' atual do input da senha
            const tipoAtual = passwordInput.getAttribute('type');

            // Se for 'password', muda para 'text'. Se for 'text', muda para 'password'.
            if (tipoAtual === 'password') {
                passwordInput.setAttribute('type', 'text');
                // Mudar a imagem para um "olho cortado"
                toggleSenhaButton.querySelector('img').src = 'img/EyeSlash.png';
            } else {
                passwordInput.setAttribute('type', 'password');
                toggleSenhaButton.querySelector('img').src = 'img/ICONS.png';
            }
        });
    }

});