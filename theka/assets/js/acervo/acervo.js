const btnNumber1 = document.querySelector('.btn-numero-1')
const btnNumber2 = document.querySelector('.btn-numero-2')
const btnNumber3 = document.querySelector('.btn-numero-3')
const btnActive = document.querySelectorAll('.btn-numeros')


btnNumber1.addEventListener('click', () => {

    alterarActive()

    btnNumber1.classList.add('active')
})

btnNumber2.addEventListener('click', () => {

    alterarActive()

    btnNumber2.classList.add('active')
})

btnNumber3.addEventListener('click', () => {

    alterarActive()

    btnNumber3.classList.add('active')
})
