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

        try {
            const response = await fetch(`http://localhost:3000/usuarios?email=${email}`);
            
            if (!response.ok) {
                throw new Error('Erro ao conectar com o servidor.');
            }

            const usuarios = await response.json();

            // se achou o e-mail, siga em frente.
            if (usuarios.length > 0) {
                
                // Salva SÓ O E-MAIL e no sessionStorage (temporário)
                sessionStorage.setItem('emailParaRecuperar', email);

                // Redireciona para a prox tela
                window.location.href = '/assets/recuperar_senha_second.html'; 

            } else {
                // Usuário NÃO encontrado
                alert('E-mail não cadastrado.');
            }

        } catch (error) {
            console.error('Erro ao verificar e-mail:', error);
            alert('Falha na comunicação com o servidor. Tente novamente.');
        }
    });
});