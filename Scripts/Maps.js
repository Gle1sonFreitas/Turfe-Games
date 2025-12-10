 var listarmapas = [
    {
        nome: 'Mundo antigo',
        imagem: '<img class="options" src="../Assets/img/BackgroundMap1.png" alt="">',
        voltas: 1
    },
    {
        nome: 'Nova Vida',
        imagem: '<img class="options" src="../Assets/img/BackgroundMap2.png" alt="">',
        Voltas: 3
    },
    {
        nome: 'Casa dos cavalhos',
        imagem: '<img class="options" src="../Assets/img/BackgroundMap3.png" alt="">',
        Voltas: 6
    }
]

var player01 = document.getElementById('imgPlayer1')
var player02 = document.getElementById('imgPlayer2')
var player03 = document.getElementById('imgPlayer3')

var NomePlayer1 = document.getElementById("NomePlayer1")
var NomePlayer2 = document.getElementById("NomePlayer2")
var NomePlayer3 = document.getElementById("NomePlayer3")

var btnPlayer1 = document.getElementById('btnPlayer1')
var btnPlayer2 = document.getElementById('btnPlayer2')
var btnPlayer3 = document.getElementById('btnPlayer3')

var readyActive1 = false
var readyActive2 = false
var readyActive3 = false


function CarregarMapas() {
    player01.innerHTML = listarmapas[0].imagem;
    NomePlayer1.innerHTML = listarmapas[0].nome;

    player02.innerHTML = listarmapas[1].imagem;
    NomePlayer2.innerHTML = listarmapas[1].nome;

    player03.innerHTML = listarmapas[2].imagem;
    NomePlayer3.innerHTML = listarmapas[2].nome;

}

var playersActive = 0

function Come(player) {
    if (player == 1) {
        sessionStorage.MAPA_SELECTED = 0;
    } else if (player == 2) {
        sessionStorage.MAPA_SELECTED = 1;
    } else if (player == 3) {
        sessionStorage.MAPA_SELECTED = 2;
    }

      Race()

}

function Race(){

    window.location = 'race.html'

}

CarregarMapas();


