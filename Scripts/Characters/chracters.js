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
    imagem: '<img class="options" src="../Assets/Sprites/Cavaleiro04.png" alt="">',
    status: 0 

},{

    nome: 'Cavaleiro05',
    imagem: '<img class="options" src="../Assets/Sprites/Cavaleiro05.png" alt="">',
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

function Characeters (){

    player01.innerHTML = listaPersonagens[0].imagem
    player02.innerHTML = listaPersonagens[0].imagem
    player03.innerHTML = listaPersonagens[0].imagem
    player04.innerHTML = listaPersonagens[0].imagem

}

function Come(player){

    if(player == 1){

        btnPlayer1.innerHTML = "ready"
        player01.innerHTML = listaPersonagens[1].imagem
        NomePlayer1.innerHTML = listaPersonagens[1].nome

    }else if (player == 2){
        
        btnPlayer2.innerHTML = "ready"
        player02.innerHTML = listaPersonagens[1].imagem
        NomePlayer2.innerHTML = listaPersonagens[1].nome

    }else if (player == 3){
        
        btnPlayer3.innerHTML = "ready"
        player03.innerHTML = listaPersonagens[1].imagem
        NomePlayer3.innerHTML = listaPersonagens[1].nome

    }else {

        btnPlayer4.innerHTML = "ready"
        player04.innerHTML = listaPersonagens[1].imagem
        NomePlayer4.innerHTML = listaPersonagens[1].nome

    }

}

var active = 0

function scrolling (player, PrevNext) {

    if (player == 1 && PrevNext == 1){

        active --

        if(active == 1){

            active = listaPersonagens.length - 1

        }

        player01.innerHTML = listaPersonagens[active].imagem
        NomePlayer1.innerHTML = listaPersonagens[active].nome

    }else if (player == 1 && PrevNext == 2){

        active ++

        if(active == listaPersonagens.length - 1){

            active = 0

        }

        player01.innerHTML = listaPersonagens[1 + active].imagem
        NomePlayer1.innerHTML = listaPersonagens[1 + active].nome

    }else if (player == 2 && PrevNext == 1){

        active --

        if(active == 0){

            active = listaPersonagens.length

        }

        player02.innerHTML = listaPersonagens[1 - active].imagem
        NomePlayer2.innerHTML = listaPersonagens[1 - active].nome

    }else if (player == 2 && PrevNext == 2){

        active ++

        if(active == listaPersonagens.length - 1){

            active = 0

        }

        player02.innerHTML = listaPersonagens[1 + active].imagem
        NomePlayer2.innerHTML = listaPersonagens[1 + active].nome

    }else if (player == 3 && PrevNext == 1){

        active --

        if(active == 0){

            active = listaPersonagens.length

        }

        player03.innerHTML = listaPersonagens[1 - active].imagem
        NomePlayer3.innerHTML = listaPersonagens[1 - active].nome

    }else if (player == 3 && PrevNext == 2){

        active ++

        if(active == listaPersonagens.length - 1){

            active = 0

        }

        player03.innerHTML = listaPersonagens[1 + active].imagem
        NomePlayer3.innerHTML = listaPersonagens[1 + active].nome

    }else if (player == 4 && PrevNext == 1){

        active --

        if(active == 0){

            active = listaPersonagens.length

        }

        player03.innerHTML = listaPersonagens[1 - active].imagem
        NomePlayer3.innerHTML = listaPersonagens[1 - active].nome

    }else if (player == 4 && PrevNext == 2){

        active ++

        if(active == listaPersonagens.length - 1){

            active = 0

        }

        player04.innerHTML = listaPersonagens[1 + active].imagem
        NomePlayer4.innerHTML = listaPersonagens[1 + active].nome

    }


}