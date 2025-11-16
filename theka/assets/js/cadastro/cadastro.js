// Aguarda o DOM estar completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    const cadastroForm = document.getElementById('cadastroForm');
    const nameInput = document.getElementById('nameCompleto');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleSenhaButton = document.getElementById('toggleSenha');
    const toggleConfirmSenhaButton = document.getElementById('toggleConfirmeSenha');

    cadastroForm.addEventListener('submit', async (event) => {

    event.preventDefault(); 

    const nome = nameInput.value;
    const email = emailInput.value;
    const senha = passwordInput.value;
    const confirmSenha = confirmPasswordInput.value;

    // verifica se as senhas são iguais
    if (senha !== confirmSenha) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return; // Para a execução se as senhas forem diferentes
    }

    try {
        // Faz um GET para o json-server filtrando pelo e-mail
        const checkEmailResponse = await fetch(`http://localhost:3000/usuarios?email=${email}`);
        
        if (!checkEmailResponse.ok) {
            throw new Error('Falha ao verificar e-mail no servidor.');
        }

        const usuariosComEsseEmail = await checkEmailResponse.json();

        if (usuariosComEsseEmail.length > 0) {
            // Se length > 0, o e-mail JÁ EXISTE
            alert('Este e-mail já está cadastrado. Por favor, utilize outro.');
            return; // Para a execução
        }

    } catch (error) {
        // Se houver um erro de rede ao tentar verificar o e-mail
        console.error('Erro ao verificar e-mail:', error);
        alert('Não foi possível verificar o e-mail. Tente novamente.');
        return; // Para a execução
    }

    // cria o objeto com os dados do novo usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha 
    };

    // Envia os dados para o json-server (Requisição POST)
    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoUsuario),
        });

        if (response.ok) {
            // Redireciona
            window.location.href = '/assets/login.html';

        } else {
            // Erro do servidor ao tentar cadastrar
            alert('Erro ao realizar o cadastro. Tente novamente.');
        }
    } catch (error) {
        // Erro de rede ao tentar cadastrar
        console.error('Erro na requisição de cadastro:', error);
        alert('Não foi possível conectar ao servidor. Tente mais tarde.');
    }
    });

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

    if (toggleConfirmSenhaButton) {
        toggleConfirmSenhaButton.addEventListener('click', () => {
            const tipoAtual = confirmPasswordInput.getAttribute('type');

            if (tipoAtual === 'password') {
                confirmPasswordInput.setAttribute('type', 'text');
                // Mudar a imagem para um "olho cortado"
                toggleConfirmSenhaButton.querySelector('img').src = 'img/EyeSlash.png';
            } else {
                confirmPasswordInput.setAttribute('type', 'password');
                toggleConfirmSenhaButton.querySelector('img').src = 'img/ICONS.png';
            }
        });
    }
});