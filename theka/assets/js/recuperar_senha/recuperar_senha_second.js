document.addEventListener('DOMContentLoaded', () => {

    const recuperarForm = document.getElementById('recuperarForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Extração dos parâmetros uid e token da URL
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid'); 
    const token = urlParams.get('token'); 


    if (!uid || !token) {
        alert('O link de redefinição de senha está incompleto ou expirado. Por favor, solicite um novo link.');

        console.error("UID ou Token ausente na URL. Formulário desativado.");
        recuperarForm.querySelector('button[type="submit"]').disabled = true; 
        
        return;
    }

    recuperarForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const novaSenha = passwordInput.value;
        const confirmSenha = confirmPasswordInput.value;

        // Verifica se as senhas locais são iguais
        if (novaSenha !== confirmSenha) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }


        const CONFIRM_URL = 'https://thekaapi.pythonanywhere.com/auth/password/reset/confirm/';

        const resetData = {
            uid: uid,
            token: token,
            new_password: novaSenha,
            new_password_confirm: confirmSenha
        };

        try {
            // Envia a requisição POST para a API
            const response = await fetch(CONFIRM_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resetData),
            });

            const responseData = await response.json();

            if (response.ok) {

                alert('Sua senha foi redefinida com sucesso! Você pode fazer login agora.');
                sessionStorage.removeItem('emailParaRecuperar'); 
                window.location.href = '/assets/login.html';

            } else {

                let errorMessage = 'Erro ao redefinir a senha. Verifique o link ou tente novamente.';

                if (responseData.new_password) {
                    errorMessage = `Erro de Senha: ${responseData.new_password.join(' ')}`;
                } else if (responseData.detail) {
                    errorMessage = `Erro: ${responseData.detail}`;
                } else if (responseData.token) {
                    errorMessage = 'Erro: Token inválido ou expirado.';
                }
                
                alert(errorMessage);
                console.error('Erro na redefinição:', response.status, responseData);
            }

        } catch (error) {
            console.error('Falha na comunicação:', error);
            alert('Falha na comunicação com o servidor.');
        }
    });
});