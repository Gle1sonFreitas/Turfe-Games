var velocidade = sessionStorage.VELOCIDADE
var tempo = sessionStorage.TEMP_ACUMULADO
var mensagem = ''

for (let i = 1; i <= velocidade; i++) {

    mensagem += `<img class="star" src="../Assets/Icons/StarIcon.png" alt="">`

}   

vel.innerHTML += mensagem
temp.innerHTML += ` ${tempo} Sec`