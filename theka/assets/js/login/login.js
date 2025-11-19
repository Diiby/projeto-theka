document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const toggleSenhaButton = document.getElementById('toggleSenha');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        // Captura os valores dos inputs
        const login = emailInput.value; // espera-se o nome de usuário
        const senha = passwordInput.value;

        // Validação de inputs
        if (!login || !senha) {
            alert('Por favor, preencha o campo de login e a senha.');
            return;
        }

        // Endpoint
        const LOGIN_URL = 'https://thekaapi.pythonanywhere.com/auth/token/'; 

        const credenciais = {
            username: login, 
            password: senha 
        };

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credenciais),
            });

            const responseData = await response.json();

            if (response.ok) {
                // SUCESSO! Armazena os tokens de acesso e refresh
                const accessToken = responseData.access; 
                const refreshToken = responseData.refresh;

                if (accessToken) {
                    // Armazena o token de acesso
                    localStorage.setItem('authToken', accessToken); 
                    
                    // Armazena o token de refresh
                    if (refreshToken) {
                        localStorage.setItem('authRefresh', refreshToken);
                    }
                    
                    alert('Login bem-sucedido! Token de acesso armazenado.');
                    window.location.href = '/inicio.html';
                
                } else {
                    alert('Login bem-sucedido, mas o token de acesso não foi encontrado na resposta do servidor.');
                    window.location.href = '/inicio.html';
                }

            } else if (response.status === 400 || response.status === 401) {
                // Credenciais inválidas
                const errorMessage = responseData.detail || 'Nome de usuário ou senha inválidos.';
                alert(errorMessage); 
                console.error('Erro de credenciais:', responseData);

            } else {
                alert('Erro desconhecido no servidor. Tente novamente.');
                console.error('Erro no servidor:', response.status, responseData);
            }

        } catch (error) {
            console.error('Falha na comunicação:', error);
            alert('Não foi possível conectar ao servidor. Verifique sua conexão.');
        }
        
    });
    
    // MOSTRAR/ESCONDE SENHA
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

});


