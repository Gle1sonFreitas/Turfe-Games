var listaPersonagens = [
    {
        nome: 'Bloqueado',
        imagem: '<img class="options" src="../Assets/Sprites/Bloqueado.png" alt="">',
        status: 1
    },
    {
        nome: 'Wynonna Earp',
        imagem: '<img class="options" src="../Assets/Sprites/Wynonna-Bronze.png" alt="">',
        status: 1
    },
    {
        nome: 'Vesper Vance',
        imagem: '<img class="options" src="../Assets/Sprites/Cavaleiro01.png" alt="">',
        status: 1
    },
    {
        nome: 'Juno', 
        imagem: '<img class="options" src="../Assets/Sprites/Cavaleiro02.png" alt="">',
        status: 0
    },
    {
        nome: 'Sadie', 
        imagem: '<img class="options" src="../Assets/Sprites/Cavaleiro03.png" alt="">',
        status: 0
    },
    {
        nome: 'Rust', 
        imagem: '<img class="options" src="../Assets/Sprites/Cavaleira04.png" alt="">',
        status: 0
    },
    {
        nome: 'Bolt', 
        imagem: '<img class="options" src="../Assets/Sprites/Cavaleira05.png" alt="">',
        status: 0
    },
    {
        nome: 'Ironhoof', 
        imagem: '<img class="options" src="../Assets/Sprites/Robot Bill-Ironhoof.png" alt="">',
        status: 0
    }
]

var player01 = document.getElementById('imgPlayer1')
var player02 = document.getElementById('imgPlayer2')
var player03 = document.getElementById('imgPlayer3')
var player04 = document.getElementById('imgPlayer4')

var NomePlayer1 = document.getElementById("NomePlayer1")
var NomePlayer2 = document.getElementById("NomePlayer2")
var NomePlayer3 = document.getElementById("NomePlayer3")
var NomePlayer4 = document.getElementById("NomePlayer4")

var btnPlayer1 = document.getElementById('btnPlayer1')
var btnPlayer2 = document.getElementById('btnPlayer2')
var btnPlayer3 = document.getElementById('btnPlayer3')
var btnPlayer4 = document.getElementById('btnPlayer4')

var readyActive1 = false
var readyActive2 = false
var readyActive3 = false
var readyActive4 = false

var ride = document.getElementById('ride')


function Characeters() {

    player01.innerHTML = listaPersonagens[0].imagem
    player02.innerHTML = listaPersonagens[0].imagem
    player03.innerHTML = listaPersonagens[0].imagem
    player04.innerHTML = listaPersonagens[0].imagem
    sessionStorage.clear()

}

var playersActive = 0

function Come(player) {

    if (player == 1) {

        btnPlayer1.innerHTML = "ready"
        btnPlayer1.onclick = () => { Ready(1) }
        player01.innerHTML = listaPersonagens[1].imagem
        NomePlayer1.innerHTML = listaPersonagens[1].nome
        playersActive++

    } else if (player == 2) {

        btnPlayer2.innerHTML = "ready"
        btnPlayer2.onclick = () => { Ready(2) }
        player02.innerHTML = listaPersonagens[1].imagem
        NomePlayer2.innerHTML = listaPersonagens[1].nome
        playersActive++

    } else if (player == 3) {

        btnPlayer3.innerHTML = "ready"
        btnPlayer3.onclick = () => { Ready(3) }
        player03.innerHTML = listaPersonagens[1].imagem
        NomePlayer3.innerHTML = listaPersonagens[1].nome
        playersActive++

    } else {

        btnPlayer4.innerHTML = "ready"
        btnPlayer4.onclick = () => { Ready(4) }
        player04.innerHTML = listaPersonagens[1].imagem
        NomePlayer4.innerHTML = listaPersonagens[1].nome
        playersActive++

    }

}

var optionActive1 = 1
var optionActive2 = 1
var optionActive3 = 1
var optionActive4 = 1

function scrolling(player, PrevNext) {

    if (player == 1 && PrevNext == 1) {

        optionActive1--

        if (optionActive1 <= 0) {

            optionActive1 = listaPersonagens.length - 1

        }

        player01.innerHTML = listaPersonagens[optionActive1].imagem
        NomePlayer1.innerHTML = listaPersonagens[optionActive1].nome


    } else if (player == 1 && PrevNext == 2) {

        optionActive1++

        if (optionActive1 >= listaPersonagens.length) {

            optionActive1 = 1

        }

        player01.innerHTML = listaPersonagens[optionActive1].imagem
        NomePlayer1.innerHTML = listaPersonagens[optionActive1].nome

    } else if (player == 2 && PrevNext == 1) {

        optionActive2--

        if (optionActive2 <= 0) {

            optionActive2 = listaPersonagens.length - 1

        }

        player02.innerHTML = listaPersonagens[optionActive2].imagem
        NomePlayer2.innerHTML = listaPersonagens[optionActive2].nome

    } else if (player == 2 && PrevNext == 2) {

        optionActive2++

        if (optionActive2 >= listaPersonagens.length) {

            optionActive2 = 1

        }

        player02.innerHTML = listaPersonagens[optionActive2].imagem
        NomePlayer2.innerHTML = listaPersonagens[optionActive2].nome

    } else if (player == 3 && PrevNext == 1) {

        optionActive3--

        if (optionActive3 <= 0) {

            optionActive3 = listaPersonagens.length - 1

        }

        player03.innerHTML = listaPersonagens[optionActive3].imagem
        NomePlayer3.innerHTML = listaPersonagens[optionActive3].nome

    } else if (player == 3 && PrevNext == 2) {

        optionActive3++

        if (optionActive3 >= listaPersonagens.length) {

            optionActive3 = 1

        }

        player03.innerHTML = listaPersonagens[optionActive3].imagem
        NomePlayer3.innerHTML = listaPersonagens[optionActive3].nome

    } else if (player == 4 && PrevNext == 1) {

        optionActive4--

        if (optionActive4 <= 0) {

            optionActive4 = listaPersonagens.length - 1

        }

        player04.innerHTML = listaPersonagens[optionActive4].imagem
        NomePlayer4.innerHTML = listaPersonagens[optionActive4].nome

    } else if (player == 4 && PrevNext == 2) {

        optionActive4++

        if (optionActive4 >= listaPersonagens.length) {

            optionActive4 = 1

        }

        player04.innerHTML = listaPersonagens[optionActive4].imagem
        NomePlayer4.innerHTML = listaPersonagens[optionActive4].nome

    }

}

var countReady = 0
var indicesSelecionados = [];

function Ready(player) {

    var config = {};
    
    if (player == 1) {
        config = { active: readyActive1, option: optionActive1, btn: btnPlayer1, key: 'PLAYER1_SELECTED' };
    } else if (player == 2) {
        config = { active: readyActive2, option: optionActive2, btn: btnPlayer2, key: 'PLAYER2_SELECTED' };
    } else if (player == 3) {
        config = { active: readyActive3, option: optionActive3, btn: btnPlayer3, key: 'PLAYER3_SELECTED' };
    } else {
        config = { active: readyActive4, option: optionActive4, btn: btnPlayer4, key: 'PLAYER4_SELECTED' };
    }

    if (config.active == false) {
        if (indicesSelecionados.includes(config.option)) {
            mostrarErro();
            return; 
        }
        config.btn.classList.add('Active');
        indicesSelecionados.push(config.option);
        sessionStorage.setItem(config.key, config.option);
        countReady++;
        
        if(player == 1) readyActive1 = true;
        if(player == 2) readyActive2 = true;
        if(player == 3) readyActive3 = true;
        if(player == 4) readyActive4 = true;

    } 
   
    else {
        config.btn.classList.remove('Active');
        
        var indexNoArray = indicesSelecionados.indexOf(config.option);
        if (indexNoArray > -1) {
            indicesSelecionados.splice(indexNoArray, 1);
        }
        
        sessionStorage.removeItem(config.key);
        countReady--;

        if(player == 1) readyActive1 = false;
        if(player == 2) readyActive2 = false;
        if(player == 3) readyActive3 = false;
        if(player == 4) readyActive4 = false;
    }

    if (playersActive == countReady && playersActive > 1) {
        ride.classList.add('Active');
        ride.onclick = () => { Ride() };
    } else {
        ride.classList.remove('Active');
        ride.onclick = () => {};
    }
}

function Ride() {

    sessionStorage.QUANTIDADE_COMPETIDORES = countReady
    window.location = 'maps.html'

}

function mostrarErro() {
    document.getElementById('modal-erro').classList.add('show');
}

function fecharModal() {
    document.getElementById('modal-erro').classList.remove('show');
}