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

        // Verifica se as senhas são iguais
        if (senha !== confirmSenha) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return; // Para a execução se as senhas forem diferentes
        }

        // API TheKaapi
        const REGISTRATION_URL = 'https://thekaapi.pythonanywhere.com/users/'; 

        const novoUsuario = {
            username: nome,
            email: email,
            password: senha,
            password_confirm: confirmSenha,
        };

        try {
            // Envia os dados para a API
            const response = await fetch(REGISTRATION_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(novoUsuario),
            });

            // Tenta obter a resposta em JSON
            const responseData = await response.json(); 

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
            
                window.location.href = '/assets/login.html';

            } else {
                // Erros 400 Bad Request se o email já existe ou dados inválidos
                const errorMessage = responseData.message || JSON.stringify(responseData) || 'Erro desconhecido ao realizar o cadastro.';
                
                if (errorMessage.includes('email') && errorMessage.includes('exist')) { 
                     alert('Este e-mail já está cadastrado. Por favor, utilize outro.');
                } else {
                    alert(`Erro ao cadastrar. Detalhes: ${errorMessage}`);
                }
            }

        } catch (error) {
            console.error('Erro na requisição de cadastro:', error);
            alert('Não foi possível conectar ao servidor. Tente mais tarde.');
        }
    });
    
    // Funções de Aparecer Senha ---

    if (toggleSenhaButton) {
        toggleSenhaButton.addEventListener('click', () => {
            const tipoAtual = passwordInput.getAttribute('type');
            if (tipoAtual === 'password') {
                passwordInput.setAttribute('type', 'text');
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
                toggleConfirmSenhaButton.querySelector('img').src = 'img/EyeSlash.png';
            } else {
                confirmPasswordInput.setAttribute('type', 'password');
                toggleConfirmSenhaButton.querySelector('img').src = 'img/ICONS.png';
            }
        });
    }
});