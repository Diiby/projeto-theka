document.addEventListener('DOMContentLoaded', () => {

    const recuperarForm = document.getElementById('recuperarForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Pega o e-mail que a "Etapa 1" salvou
    const emailParaRecuperar = sessionStorage.getItem('emailParaRecuperar');

    // Se não houver e-mail salvo, manda o usuário de volta
    if (!emailParaRecuperar) {
        alert('Nenhum e-mail encontrado. Por favor, comece o processo de recuperação novamente.');
        window.location.href = '/assets/recuperar_senha_first.html';
        return;
    }

    recuperarForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const novaSenha = passwordInput.value;
        const confirmSenha = confirmPasswordInput.value;

        // verifica se as senhas são iguais
        if (novaSenha !== confirmSenha) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        try {
            // Vamos buscar o usuário pelo e-mail que salvamos.
            const responseGet = await fetch(`http://localhost:3000/usuarios?email=${emailParaRecuperar}`);
            const usuarios = await responseGet.json();

            if (usuarios.length === 0) {

                alert('Usuário não encontrado.');
                return;
            }

            const usuario = usuarios[0];
            const userId = usuario.id;

            // PATCH é melhor que PUT, pois só atualiza o campo 'senha'
            const responsePatch = await fetch(`http://localhost:3000/usuarios/${userId}`, {
                method: 'PATCH', // PATCH = Atualização Parcial
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senha: novaSenha // Envia apenas a nova senha
                }),
            });

            if (responsePatch.ok) {
                // alert('sucesso')
                window.location.href = '/assets/login.html';

            } else {
                alert('Erro ao atualizar a senha. Tente novamente.');
            }

        } catch (error) {
            console.error('Erro ao recuperar senha:', error);
            alert('Falha na comunicação com o servidor.');
        }
    });
});