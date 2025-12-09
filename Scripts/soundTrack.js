var trilhaAtivacao = false

function Iniciar (){

    inicio.style.display = 'none'
    container_menu.style.display = 'flex'

    TrilhaSonora()

}

function EfeitoSonoro () {

    var efeitoSonoro = new Audio('../Assets/Audio/EfeitoSonoro/efeitoMenu.mp3')

    efeitoSonoro.currentTime = 0;
    efeitoSonoro.play();


}

function TrilhaSonora () {
    
    var trilhaSonora = new Audio('../Assets/Audio/TrilhaSonora/trilhaMenu.mp3')

    if (!trilhaAtivacao){

        trilhaSonora.play();
        trilhaAtivacao = true

    }

    trilhaSonora.loop = true;

}