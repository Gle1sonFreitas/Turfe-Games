sessionStorage.QUANTIDADE_COMPETIDORES = 2
sessionStorage.PROTAGONISTA = 1

var PontosAcumulados = sessionStorage.PONTOS
PontosAcumulados == undefined ? PontosAcumulados = 0 : PontosAcumulados
var Pontos = 1 + Number(PontosAcumulados)

var CardPontos = document.getElementById('pontos')
CardPontos.innerHTML = `Pontos: ${Pontos}`

var historicoVelocidade = sessionStorage.VELOCIDADE
var velocidadeTotal = Number(historicoVelocidade)
isNaN(velocidadeTotal) ? velocidadeTotal = 0 : velocidadeTotal;

for (let i = 1; i <= velocidadeTotal; i++) {
    
    document.getElementById(`Ponto${i}`).classList.add('Ativo')
    
}

function Upgrade (){

    var velocidade = 0

    if (Pontos <= 0){

        alert('Pontos Insuficientes')

    }else if (velocidadeTotal < 5){

        console.log(velocidadeTotal)
        velocidade++
        Pontos--
        velocidadeTotal += velocidade
        console.log(velocidadeTotal)
        sessionStorage.VELOCIDADE = velocidadeTotal

        for (let i = 1; i <= velocidadeTotal; i++) {
    
            document.getElementById(`Ponto${i}`).classList.add('Ativo')
    
        }

    }else {

        alert('Velocidade maxima alcançada')

    }

    document.getElementById('pontos').innerHTML = `Pontos: ${Pontos}`

}

function Run (){

    sessionStorage.PONTOS = Pontos
    window.location = 'racehistory.html'

}