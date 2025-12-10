 var listarmapas = [
    {
        nome: 'Mundo antigo',
        imagem: '<img class="options" src="../Assets/img/Mapa1.png" alt="">',
        status: 1
    },
    {
        nome: 'Nova Vida',
        imagem: '<img class="options" src="../Assets/img/Mapa2.png" alt="">',
        status: 1
    },
    {
        nome: 'Casa dos cavalhos',
        imagem: '<img class="options" src="../Assets/img/Mapa3.png" alt="">',
        status: 1
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

var mapaSelecionado = null; 


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
     var  mapaSelecionado = player - 1; 
    alert("Mapa selecionado: " + listarmapas[mapaSelecionado].nome);

}
CarregarMapas();


