document.addEventListener('DOMContentLoaded', () => {
    const recuperarForm = document.getElementById('recuperarEmailForm'); 
    const emailInput = document.getElementById('email');

    recuperarForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const email = emailInput.value;

        if (!email) {
            alert('Por favor, preencha o e-mail.');
            return;
        }

        const RESET_URL = 'https://thekaapi.pythonanywhere.com/auth/password/reset/'; 

        const resetData = {
            email: email
        };

        try {
            const response = await fetch(RESET_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resetData),
            });
            
            const responseData = await response.json();

            if (response.ok) {
                // Sucesso! A API iniciou o processo de envio do e-mail.
                alert('Se o e-mail estiver cadastrado, você receberá um link de redefinição de senha.');
                // Redireciona, embora o usuário deva checar o e-mail.
                window.location.href = '/assets/recuperar_senha_second.html'; 

            } else {
                // Erro de validação da API (Status 400)
                const errorMessage = responseData.email || responseData.detail || 'Não foi possível iniciar a recuperação. Tente novamente.';
                
                alert(`Erro: ${errorMessage}`);
                console.error('Erro no servidor:', response.status, responseData);
            }

        } catch (error) {
            console.error('Falha na comunicação:', error);
            alert('Falha na comunicação com o servidor. Verifique sua conexão.');
        }
    });
});