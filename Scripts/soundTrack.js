var trilhaAtivacao = false

function IniciarSong (tela){
    
    if (tela == 1){
        
        inicio.style.display = 'none'
        container_menu.style.display = 'flex'
        TrilhaSonoraMenu()
        
    }else if (tela == 2){
        
        trilhaSonoraCharacters()
        
    }else if(tela == 3){

        trilhaSonoraCut()

    }else if (tela == 4){

        trilhaSonoraUpdate()

    }else if (tela == 4){

        trilhaSonoraWin()

    }else {

        trilhaSonoraFase()

    }
    
}

function EfeitoSonoroMenu () {
    
    var efeitoSonoro = new Audio('../Assets/Audio/EfeitoSonoro/efeitoMenu.mp3')
    
    efeitoSonoro.currentTime = 0;
    efeitoSonoro.play();
    
    
}

function EfeitoSonoroCharacter (button) {

    if (button == 1) {

        var efeitoSonoro = new Audio("../Assets/Audio/EfeitoSonoro/efeitoReady.mp3")
        
    }else{
        
        var efeitoSonoro = new Audio("../Assets/Audio/EfeitoSonoro/efeitoCharacter.mp3")

    }

    efeitoSonoro.currentTime = 0;
    efeitoSonoro.play(); 

    

}

function TrilhaSonoraMenu () {
        
    var trilhaSonora = new Audio('../Assets/Audio/TrilhaSonora/trilhaMenu.mp3')

    if (!trilhaAtivacao){

        trilhaSonora.play();
        trilhaAtivacao = true

    }

    trilhaSonora.loop = true;

}

function trilhaSonoraCharacters (){

    var trilhaSonora = new Audio('../Assets/Audio/TrilhaSonora/trilhaCharacters.mp3')

    if (!trilhaAtivacao){

        trilhaSonora.play();
        trilhaAtivacao = true

    }

    trilhaSonora.loop = true;

}

function trilhaSonoraCut() {

    var trilhaSonora = new Audio('../Assets/Audio/TrilhaSonora/trilhaCut.mp3')

    if (!trilhaAtivacao){

        trilhaSonora.play();
        trilhaAtivacao = true

    }

    trilhaSonora.loop = true;

}   

function trilhaSonoraUpdate() {

    var trilhaSonora = new Audio('../Assets/Audio/TrilhaSonora/trilhaCut02.mp3')

    if (!trilhaAtivacao){

        trilhaSonora.play();
        trilhaAtivacao = true

    }

    trilhaSonora.loop = true;

}  

function trilhaSonoraWin(){

      var trilhaSonora = new Audio('../Assets/Audio/TrilhaSonora/trilhaFase02.mp3')

    if (!trilhaAtivacao){

        trilhaSonora.play();
        trilhaAtivacao = true

    }

    trilhaSonora.loop = true;

}

function trilhaSonoraFase() {

          var trilhaSonora = new Audio('../Assets/Audio/TrilhaSonora/trilhaFase.mp3')

    if (!trilhaAtivacao){

        trilhaSonora.play();
        trilhaAtivacao = true

    }

    trilhaSonora.loop = true;

}

function handleNavigation(url) {
                window.location.href = url;
    }