const valoresCards = document.querySelectorAll('.section-valores .grid-content');

valoresCards.forEach(card => {
    card.addEventListener('click', function() {
        // Alterna a classe 'is-flipped' no card clicado
        this.classList.toggle('is-flipped');
    });
});