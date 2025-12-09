var trilhaAtivacao = false

function IniciarSong (tela){
    
    if (tela == 1){
        
        inicio.style.display = 'none'
        container_menu.style.display = 'flex'
        TrilhaSonoraMenu()
        
    }else if (tela == 2){
        
        trilhaSonoraCharacters()
        
    }
    
}

function EfeitoSonoroMenu () {
    
    var efeitoSonoro = new Audio('../Assets/Audio/EfeitoSonoro/efeitoMenu.mp3')
    
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