var listaPersonagens = [
{
    nome: 'Bloqueado',
    imagem: '<img class="options" src="../Assets/Sprites/Bloqueado.png" alt="">',
    status: 1

},{

    nome: 'Wynonna Earp',
    imagem: '<img class="options" src="../Assets/Sprites/Wynonna-Bronze.png" alt="">',
    status: 1

},{

    nome: 'Cavaleiro01',
    imagem: '<img class="options" src="../Assets/Sprites/Cavaleiro01.png" alt="">',
    status: 1

},{

    nome: 'Cavaleiro02',
    imagem: '<img class="options" src="../Assets/Sprites/Cavaleiro02.png" alt="">',
    status: 0 

},{

    nome: 'Cavaleiro03',
    imagem: '<img class="options" src="../Assets/Sprites/Cavaleiro03.png" alt="">',
    status: 0 

},{

    nome: 'Cavaleiro04',
    imagem: '<img class="options" src="../Assets/Sprites/Cavaleira04.png" alt="">',
    status: 0 

},{

    nome: 'Cavaleiro05',
    imagem: '<img class="options" src="../Assets/Sprites/Cavaleira05.png" alt="">',
    status: 0 

},{

    nome: 'Cavaleiro6',
    imagem: '<img class="options" src="../Assets/Sprites/Robot Bill-Ironhoof.png" alt="">',
    status: 0 

}]

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


function Characeters (){
    
    player01.innerHTML = listaPersonagens[0].imagem
    player02.innerHTML = listaPersonagens[0].imagem
    player03.innerHTML = listaPersonagens[0].imagem
    player04.innerHTML = listaPersonagens[0].imagem
    sessionStorage.clear()
    
}

var playersActive = 0

function Come(player){

    if(player == 1){

        btnPlayer1.innerHTML = "ready" 
        btnPlayer1.onclick = () => {Ready(1)} 
        player01.innerHTML = listaPersonagens[1].imagem
        NomePlayer1.innerHTML = listaPersonagens[1].nome
        playersActive++

    }else if (player == 2){
        
        btnPlayer2.innerHTML = "ready" 
        btnPlayer2.onclick = () => {Ready(2)} 
        player02.innerHTML = listaPersonagens[1].imagem
        NomePlayer2.innerHTML = listaPersonagens[1].nome
        playersActive++

    }else if (player == 3){
        
        btnPlayer3.innerHTML = "ready" 
        btnPlayer3.onclick = () => {Ready(3)} 
        player03.innerHTML = listaPersonagens[1].imagem
        NomePlayer3.innerHTML = listaPersonagens[1].nome
        playersActive++

    }else {

        btnPlayer4.innerHTML = "ready" 
        btnPlayer4.onclick = () => {Ready(4)} 
        player04.innerHTML = listaPersonagens[1].imagem
        NomePlayer4.innerHTML = listaPersonagens[1].nome
        playersActive++

    }

}

var optionActive1 = 1
var optionActive2 = 1
var optionActive3 = 1
var optionActive4 = 1

function scrolling (player, PrevNext) {

    if (player == 1 && PrevNext == 1){

        optionActive1 --

        if(optionActive1 <= 0){

            optionActive1 = listaPersonagens.length - 1

        }

        player01.innerHTML = listaPersonagens[optionActive1].imagem
        NomePlayer1.innerHTML = listaPersonagens[optionActive1].nome


    }else if (player == 1 && PrevNext == 2){

        optionActive1 ++

        if(optionActive1 >= listaPersonagens.length){

            optionActive1 = 1

        }

        player01.innerHTML = listaPersonagens[optionActive1].imagem
        NomePlayer1.innerHTML = listaPersonagens[optionActive1].nome

    }else if (player == 2 && PrevNext == 1){

        optionActive2 --

        if(optionActive2 <= 0){

            optionActive2 = listaPersonagens.length - 1

        }

        player02.innerHTML = listaPersonagens[optionActive2].imagem
        NomePlayer2.innerHTML = listaPersonagens[optionActive2].nome

    }else if (player == 2 && PrevNext == 2){

        optionActive2 ++

        if(optionActive2 >= listaPersonagens.length){

            optionActive2 = 1

        }

        player02.innerHTML = listaPersonagens[optionActive2].imagem
        NomePlayer2.innerHTML = listaPersonagens[optionActive2].nome

    }else if (player == 3 && PrevNext == 1){

        optionActive3 --

        if(optionActive3 <= 0){

            optionActive3 = listaPersonagens.length - 1

        }

        player03.innerHTML = listaPersonagens[optionActive3].imagem
        NomePlayer3.innerHTML = listaPersonagens[optionActive3].nome

    }else if (player == 3 && PrevNext == 2){

        optionActive3 ++

        if(optionActive3 >= listaPersonagens.length){

            optionActive3 = 1

        }

        player03.innerHTML = listaPersonagens[optionActive3].imagem
        NomePlayer3.innerHTML = listaPersonagens[optionActive3].nome

    }else if (player == 4 && PrevNext == 1){

        optionActive4 --

        if(optionActive4 <= 0){

            optionActive4 = listaPersonagens.length - 1

        }

        player04.innerHTML = listaPersonagens[optionActive4].imagem
        NomePlayer4.innerHTML = listaPersonagens[optionActive4].nome

    }else if (player == 4 && PrevNext == 2){

        optionActive4 ++

        if(optionActive4 >= listaPersonagens.length){

            optionActive4 = 1

        }

        player04.innerHTML = listaPersonagens[optionActive].imagem
        NomePlayer4.innerHTML = listaPersonagens[optionActive].nome

    }

}

var countReady = 0

function Ready(player){

    if (player == 1){
        
        if (readyActive1 == false){
            btnPlayer1.classList.add('Active')
            readyActive1 = true
            sessionStorage.PLAYER1_SELECTED = optionActive1
            countReady++
        }else {
            btnPlayer1.classList.remove('Active')
            readyActive1 = false
            sessionStorage.removeItem('PLAYER1_SELECTED')
            countReady--
        }

    }else if (player == 2){
        
        if (readyActive2 == false){
            btnPlayer2.classList.add('Active')
            readyActive2 = true
            sessionStorage.PLAYER2_SELECTED = optionActive2
            countReady++

        }else {
            btnPlayer2.classList.remove('Active')
            readyActive2 = false
            sessionStorage.removeItem('PLAYER2_SELECTED')
            countReady--

        }

    }else if (player == 3){
        
        if (readyActive3 == false){
            btnPlayer3.classList.add('Active')
            readyActive3 = true
            sessionStorage.PLAYER3_SELECTED = optionActive3
            countReady++

        }else {
            btnPlayer3.classList.remove('Active')
            readyActive3 = false
            sessionStorage.removeItem('PLAYER3_SELECTED')
            countReady--

        }

    }else{
        
        if (readyActive4 == false){
            btnPlayer4.classList.add('Active')
            readyActive4 = true
            sessionStorage.PLAYER4_SELECTED = optionActive4
            countReady++

        }else {
            btnPlayer4.classList.remove('Active')
            readyActive4 = false
            sessionStorage.removeItem('PLAYER4_SELECTED')
            countReady--

        }
        
    }

    if (playersActive == countReady && playersActive > 1){

        ride.classList.add('Active')
        ride.onclick = () => {Ride()}

    }else {

        ride.classList.remove('Active')
        ride.onclick = () => {}

    }
    
}

function Ride(){

    sessionStorage.QUANTIDADE_COMPETIDORES = countReady    
    window.location = 'maps.html'

}