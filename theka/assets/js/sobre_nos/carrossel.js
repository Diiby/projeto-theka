const carouselList = document.querySelector('.lista-carrossel');

let isDown = false; 
let startX;       
let scrollLeft; 

// Quando o usuário PRESSIONA o mouse
carouselList.addEventListener('mousedown', (e) => {
    isDown = true;
    carouselList.classList.add('is-dragging');
    
    // Pega a posição inicial X do mouse, relativa ao carrossel
    startX = e.pageX - carouselList.offsetLeft;
    
    // Salva a posição atual da rolagem
    scrollLeft = carouselList.scrollLeft;

    // Previne o comportamento padrão
    e.preventDefault();
});

// Quando o usuário SOLTA o mouse
window.addEventListener('mouseup', () => {
    isDown = false;
    carouselList.classList.remove('is-dragging');
});

// Quando o usuário MOVE o mouse
window.addEventListener('mousemove', (e) => {
    if (!isDown) return; // Só executa se o mouse estiver pressionado

    // Calcula a nova posição X do mouse
    const x = e.pageX - carouselList.offsetLeft;
    
    // Calcula o quanto o mouse se moveu
    const walk = (x - startX); 
    
    // Atualiza a posição da rolagem
    carouselList.scrollLeft = scrollLeft - walk;
});
