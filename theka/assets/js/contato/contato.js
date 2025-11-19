// Dados (URLs e Endereços REAIS foram encontrados via busca)
const unidadesData = {
    'natal': {
        endereco: 'Avenida Senador Salgado Filho, 2234, Av. das Brancas Dunas, 47 - Candelária, Natal - RN, 59064-900 (Natal Shopping)',
        iframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.0959539127116!2d-35.21424572427283!3d-5.842098757577458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2ff7f3d2f608f%3A0xd58db53fc452bd36!2sNatal%20Shopping!5e0!3m2!1spt-PT!2sbr!4v1762287920243!5m2!1spt-PT!2sbr' 
    },
    'midway': {
        endereco: 'Av. Bernardo Vieira, 3775 - Tirol, Natal - RN, 59015-900 (Midway Mall)',
        iframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.3127771595387!2d-35.20859662427301!3d-5.8114283573162275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2fffb0f33b749%3A0x486365a958735e92!2sAv.%20Nevaldo%20Rocha%2C%203775%20-%20Tirol%2C%20Natal%20-%20RN%2C%2059015-450!5e0!3m2!1spt-PT!2sbr!4v1763492295672!5m2!1spt-PT!2sbr' 
    }
};

function mudarUnidade(unidade) {
    const iframe = document.getElementById('mapa-iframe');
    const enderecoP = document.getElementById('endereco-texto');
    const btnNatal = document.getElementById('btn-natal-shopping');
    const btnMidway = document.getElementById('btn-midway');

    const dados = unidadesData[unidade];

    // Atualiza o iframe e o texto se os dados existirem
    if (dados) {
        iframe.src = dados.iframeSrc;
        enderecoP.textContent = dados.endereco;
    }

    // Gerencia a classe 'ativo' para mudar o estilo do botão
    if (unidade === 'natal') {
        btnNatal.classList.add('ativo');
        btnMidway.classList.remove('ativo');
    } else if (unidade === 'midway') {
        btnNatal.classList.remove('ativo');
        btnMidway.classList.add('ativo');
    }
}