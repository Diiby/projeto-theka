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
            // Faz uma requisição POST para iniciar o processo de recuperação
            const response = await fetch(RESET_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resetData),
            });
            
            const responseData = await response.json();

            if (response.ok) {
                // SUCESSO! A API DEVE ter iniciado o envio do e-mail.
                alert('Email de recuperação enviado com sucesso');

                window.location.href = '/assets/recuperar_senha_second.html'; 

            } else {
                // ERRO do servidor se o formato do e-mail for inválido)
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