var Pontos = sessionStorage.PONTOS

function ExibirPontos (){

   var CardPontos = document.getElementById('pontos')

   if (Pontos == undefined){

    Pontos = 20

   }

   CardPontos.innerHTML = `Pontos: ${Pontos}`

   sessionStorage.QUANTIDADE_COMPETIDORES = 2
   sessionStorage.PROTAGONISTA = 1

}

var velocidadeTotal = 0
var resistenciaTotal = 0

function Upgrade (local){

    var velocidade = 0
    var resistencia = 0

    if (Pontos <= 0){

        alert('Pontos Insuficientes')

    }else if (local == 1){

        velocidade++
        Pontos--
        velocidadeTotal += velocidade
        document.getElementById('Speed').value = Number(velocidadeTotal)

    }else if (local == 2){

        resistencia++
        Pontos--
        resistenciaTotal += resistencia
        document.getElementById('resistence').value = Number(resistenciaTotal)

    }

    document.getElementById('pontos').innerHTML = `Pontos: ${Pontos}`

}

