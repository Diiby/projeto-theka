const equipeCards = document.querySelectorAll('.grid-content-equipe');

equipeCards.forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('is-active');
    });
});