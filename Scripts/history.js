function CutCene(cena) {

    if(cena == 1){

        document.getElementById('cena01').classList.remove('Active')
        document.getElementById('text01').classList.remove('ActiveText')

        document.getElementById('cena02').classList.add('Active')
        document.getElementById('text02').classList.add('ActiveText')

        document.getElementById('Next').onclick = () => {CutCene(2)}

    }else if (cena == 2){

        document.getElementById('cena02').classList.remove('Active')
        document.getElementById('text02').classList.remove('ActiveText')

        document.getElementById('cena03').classList.add('Active')
        document.getElementById('text03').classList.add('ActiveText')

        document.getElementById('Next').onclick = () => {CutCene(3)}

    }else {

        window.location = 'upgrade.html'

    }


}