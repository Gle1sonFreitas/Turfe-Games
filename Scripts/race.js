var mapaIndex = parseInt(sessionStorage.MAPA_SELECTED) || 0; 
        var QTD_CAVALOS = parseInt(sessionStorage.QUANTIDADE_COMPETIDORES) || 4; 
        
        var GAME_WIDTH = game_container.offsetWidth;
        var COMPRIMENTO_PISTA = GAME_WIDTH * 3; 

        var listarmapas = [
            {
                nome: 'Mundo antigo',
                imagem: '../Assets/img/BackgroundMap1.png', 
                voltas: 1
            },
            {
                nome: 'Nova Vida',
                imagem: '../Assets/img/mapa-2V4.png',
                voltas: 3 
            },
            {
                nome: 'Casa dos carvalhos',
                imagem: '../Assets/img/BackgroundMap3.png',
                voltas: 6
            }
        ];

        var MAX_VOLTAS = 7; 
        if (listarmapas[mapaIndex]) {
            MAX_VOLTAS = listarmapas[mapaIndex].voltas;
        }

        function renderBackground(){
            if(bg_unico && listarmapas[mapaIndex]) {
                bg_unico.style.backgroundImage = `url('${listarmapas[mapaIndex].imagem}')`;
            }
        }
        renderBackground();

        var cavalos = [];
        var corridaAndando = false;
        var loopId;
        var bgPos = 0;
        var velocidadeMundo = 5; 
        var intervaloVisualLog = null; 
        
        function criarCavalo(idPersonagem, numero, indiceVisual) {
            
            var cavalo = {
                id: idPersonagem,
                numero: numero,
                x: 50 + (Math.random() * 20), 
                y: 0,
                velocidadeAtual: velocidadeMundo, 
                velocidadeAlvo: velocidadeMundo, 
                finalizou: false,
                frameIndex: 0,
                intervaloAnimacao: null,
                escala: 0,
                oscilacaoY: 0,
                tempoOscilacao: Math.random() * 10,
                elemento: document.createElement('img'),
                tempoAcumulado: 0.0,
                historicoVoltas: [] 
            };

            var skinCavalo = 'fire';  

            var idCheck = parseInt(idPersonagem);

            if(idCheck == 1){
                skinCavalo = 'fire';
            }else if(idCheck == 2){
                skinCavalo = 'tricolor';
            }else if(idCheck == 3){
                skinCavalo = 'board';
            }else if(idCheck == 4){
                skinCavalo = 'ultimo';
            }else if(idCheck == 5){
                skinCavalo = 'black';
            }else if(idCheck == 6){
                skinCavalo = 'white';
            }else if(idCheck == 7){
                skinCavalo = 'robot';
            }

            var framesCavalo = [
                `../Assets/race/${skinCavalo}/sprint-1.png`, 
                `../Assets/race/${skinCavalo}/sprint-2.png`, 
                `../Assets/race/${skinCavalo}/sprint-3.png` 
            ];
            
            cavalo.elemento.classList.add('cavalo');
            cavalo.elemento.src = framesCavalo[0];
            cavalo.elemento.draggable = false;

            var label = document.createElement('div');
            label.classList.add('numero-cavalo');
            label.innerText = numero;
            cavalo.elemento.appendChild(label);

            var alturaUtil = 100; 
            var margemTopo = 200; 
            var step = alturaUtil / QTD_CAVALOS;
            var variacaoRaia = (Math.random() * 6) - 3; 
            
            cavalo.y = margemTopo + (indiceVisual * step) + variacaoRaia;
            var fatorProfundidade = (cavalo.y - margemTopo) / alturaUtil; 
            cavalo.escala = 0.8 + (fatorProfundidade * 0.3); 
            cavalo.elemento.style.zIndex = Math.floor(cavalo.y); 
            
            cavalo.updateVisuals = function() {
                var diff = cavalo.velocidadeAtual - velocidadeMundo;
                var angulo = diff * 2; 
                var pulo = Math.sin(cavalo.tempoOscilacao) * 5; 

                cavalo.elemento.style.transform = `
                    translate(${cavalo.x}px, ${cavalo.y + pulo}px) 
                    scale(${cavalo.escala}) 
                    rotate(${angulo}deg)
                `;
                cavalo.tempoOscilacao += 0.4; 
            };

            cavalo.iniciarAnimacao = function() {
                if (cavalo.intervaloAnimacao) return;
                var fps = 15; 
                cavalo.intervaloAnimacao = setInterval(function() {
                    cavalo.elemento.src = framesCavalo[cavalo.frameIndex];
                    cavalo.frameIndex++;
                    if (cavalo.frameIndex >= framesCavalo.length) cavalo.frameIndex = 0;
                }, 1000 / fps);
            };

            cavalo.pararAnimacao = function() {
                if (cavalo.intervaloAnimacao) {
                    clearInterval(cavalo.intervaloAnimacao);
                    cavalo.intervaloAnimacao = null;
                }
            };

            cavalo.correr = function() {
                if (cavalo.finalizou) return false;

                var inercia = 0.02; 
                cavalo.velocidadeAtual += (cavalo.velocidadeAlvo - cavalo.velocidadeAtual) * inercia;
                
                var deslocamento = (cavalo.velocidadeAtual - velocidadeMundo);
                cavalo.x += deslocamento;

                cavalo.updateVisuals();

                if (cavalo.x >= GAME_WIDTH - 515) {
                    cavalo.finalizou = true;
                    return true;
                }
                return false;
            };

            cavalo.resetar = function() {
                cavalo.pararAnimacao();
                cavalo.x = 50 + (Math.random() * 20);
                cavalo.velocidadeAtual = velocidadeMundo;
                cavalo.velocidadeAlvo = velocidadeMundo;
                cavalo.finalizou = false;
                cavalo.frameIndex = 0;
                cavalo.elemento.src = framesCavalo[0];
                cavalo.tempoAcumulado = 0;
                cavalo.historicoVoltas = [];
                cavalo.updateVisuals();
            };

            cavalo.remover = function() {
                cavalo.elemento.remove();
            };

            cavalo.updateVisuals();
            game_container.appendChild(cavalo.elemento);

            return cavalo;
        }

        function preCalcularCorrida() {
            var menorTempoTotal = 9999;
            var piorTempoTotal = 0;

            for (var i = 0; i < cavalos.length; i++) {
                var c = cavalos[i];
                c.tempoAcumulado = 0;
                c.historicoVoltas = [];
                
                for (var v = 0; v < MAX_VOLTAS; v++) {
                    var tempoVolta = (Math.random() * 2) + 7;
                    var tempoFormatado = parseFloat(tempoVolta.toFixed(1));
                    c.tempoAcumulado += tempoFormatado;
                    c.historicoVoltas.push(tempoFormatado);
                }

                if (c.tempoAcumulado < menorTempoTotal) menorTempoTotal = c.tempoAcumulado;
                if (c.tempoAcumulado > piorTempoTotal) piorTempoTotal = c.tempoAcumulado;
            }

            for (var i = 0; i < cavalos.length; i++) {
                var c = cavalos[i];
                
                var fatorDesempenho = 0;
                if (piorTempoTotal !== menorTempoTotal) {
                    fatorDesempenho = (piorTempoTotal - c.tempoAcumulado) / (piorTempoTotal - menorTempoTotal);
                } else {
                    fatorDesempenho = 0.5; 
                }

                c.velocidadeAlvo = velocidadeMundo + 0.5 + (fatorDesempenho * 2.0);
            }
        }

        function iniciarExibicaoLogs() {
            conteudo_logs.innerHTML = "";
            var voltaExibida = 0;

            intervaloVisualLog = setInterval(function() {
                if (voltaExibida >= MAX_VOLTAS) {
                    clearInterval(intervaloVisualLog);
                    return;
                }

                var htmlVolta = "<strong>--- Volta " + (voltaExibida + 1) + " ---</strong><br>";

                for (var i = 0; i < cavalos.length; i++) {
                    var c = cavalos[i];
                    var tempo = c.historicoVoltas[voltaExibida];
                    
                    var somaAteAgora = 0;
                    for(var k=0; k<=voltaExibida; k++) somaAteAgora += c.historicoVoltas[k];

                    htmlVolta += "Cavalo " + c.numero + ": " + tempo.toFixed(1) + "s (Total: " + somaAteAgora.toFixed(1) + "s)<br>";
                }

                conteudo_logs.innerHTML += "<div class='log-entry'>" + htmlVolta + "</div>";
                ui.scrollTop = ui.scrollHeight; 

                voltaExibida++;
            }, 800); 
        }

        function setup() {
            var antigos = document.querySelectorAll('.cavalo');
            for (var i = 0; i < antigos.length; i++) {
                antigos[i].remove();
            }
            cavalos = [];

            for (var i = 0; i < QTD_CAVALOS; i++) {
                var playerSelected = 1;  
                
            
                if(i == 0){
                    playerSelected = sessionStorage.PLAYER1_SELECTED;
                }else if(i == 1){
                     playerSelected = sessionStorage.PLAYER2_SELECTED;
                }else if( i == 2){
                     playerSelected = sessionStorage.PLAYER3_SELECTED;
                }else{
                     playerSelected = sessionStorage.PLAYER4_SELECTED;
                }
                
           
                if(!playerSelected) playerSelected = 1; 

                var novoCavalo = criarCavalo(playerSelected, i + 1, i);
                cavalos.push(novoCavalo);
            }
            updateFundo();
            prepararLargada();
        }

        function updateFundo() {
            bgPos -= velocidadeMundo; 
            if(bg_unico) bg_unico.style.backgroundPositionX = bgPos + "px";
        }

        function gameLoop() {
            if (!corridaAndando) return;

            updateFundo();

            var alguemChegou = false;
            var campeaoVisual = null;

            for (var i = 0; i < cavalos.length; i++) {
                var c = cavalos[i];
                var cruzou = c.correr();
                
                if (cruzou && !alguemChegou) {
                    alguemChegou = true;
                    campeaoVisual = c;
                }
            }

            if (alguemChegou) {
                finalizarCorrida(campeaoVisual);
            } else {
                loopId = requestAnimationFrame(gameLoop);
            }
        }

        function finalizarCorrida(vencedorVisual) {
            corridaAndando = false;
            if(intervaloVisualLog) clearInterval(intervaloVisualLog); 

            for (var i = 0; i < cavalos.length; i++) {
                cavalos[i].pararAnimacao();
            }

            var campeao = null;
            var tempoCampeao = 99999;

            for (var i = 0; i < cavalos.length; i++) {
                if (cavalos[i].tempoAcumulado < tempoCampeao) {
                    tempoCampeao = cavalos[i].tempoAcumulado;
                    campeao = cavalos[i];
                }
            }

            var vice = null;
            var tempoVice = 99999;

            for (var i = 0; i < cavalos.length; i++) {
                if (cavalos[i] !== campeao) {
                    if (cavalos[i].tempoAcumulado < tempoVice) {
                        tempoVice = cavalos[i].tempoAcumulado;
                        vice = cavalos[i];
                    }
                }
            }
      
            var terceiro = null;
            var tempoTerceiro = 99999;

            for (var i = 0; i < cavalos.length; i++) {
                if (cavalos[i] !== campeao && (vice && cavalos[i] !== vice)) {
                    if (cavalos[i].tempoAcumulado < tempoTerceiro) {
                        tempoTerceiro = cavalos[i].tempoAcumulado;
                        terceiro = cavalos[i];
                    }
                }
            }

         
            sessionStorage.CAMPEAO = campeao.id;
            
            if (vice) {
                sessionStorage.SEGUNDO = vice.id;
            }
            if (terceiro) {
                sessionStorage.TERCEIRO = terceiro.id;
            }
            
            var msg = mensagem;
            msg.innerText = `VENCEDOR: #${campeao.numero} (Tempo: ${campeao.tempoAcumulado.toFixed(1)}s)`;
            msg.style.color = "#fff";
            
            campeao.elemento.style.zIndex = 9999;
            campeao.elemento.style.transform += " scale(1.2)";
           
            var painel = conteudo_logs; 
            painel.innerHTML += "<div class='log-entry' style='color:#ffd700; font-weight:bold; border-top:1px solid #ffd700; margin-top:10px;'>FIM DA CORRIDA</div>";
          
            painel.innerHTML += "<div class='log-entry'>1º Lugar: Cavalo " + campeao.numero + "</div>";
            if(vice) painel.innerHTML += "<div class='log-entry'>2º Lugar: Cavalo " + vice.numero + "</div>";
            if(terceiro) painel.innerHTML += "<div class='log-entry'>3º Lugar: Cavalo " + terceiro.numero + "</div>";
            setTimeout(() => {
                window.location = './telaFinal.html';
            }, 2000);
        }
        
        function prepararLargada() {
            if (corridaAndando) return;

            var precisaResetar = false;
            for (var i = 0; i < cavalos.length; i++) {
                if (cavalos[i].finalizou) {
                    precisaResetar = true;
                    break;
                }
            }
            
            if (precisaResetar) {
                resetarCorrida();
                setTimeout(iniciarCronometro, 200);
            } else {
                iniciarCronometro();
            }
        }

        function iniciarCronometro() {
            var count = 3;
            top_timer.style.display = 'block';
            top_timer.innerText = count;

            var countdownInterval = setInterval(function() {
                count--;
                if (count > 0) {
                    top_timer.innerText = count;
                } else {
                    clearInterval(countdownInterval);
                    top_timer.innerText = "JÁ!";
                    setTimeout(function() {
                        top_timer.style.display = 'none';
                        executarCorrida();
                    }, 500);
                }
            }, 1000);
        }
            
        function executarCorrida() {
            preCalcularCorrida();

            corridaAndando = true;
            mensagem.innerText = "VAI!!!";
            mensagem.style.color = "#ff4444";
            
            for (var i = 0; i < cavalos.length; i++) {
                cavalos[i].iniciarAnimacao();
            }
            
            iniciarExibicaoLogs();

            gameLoop();
        }

        function resetarCorrida() {
            corridaAndando = false;
            cancelAnimationFrame(loopId);
            if(intervaloVisualLog) clearInterval(intervaloVisualLog);
            
            conteudo_logs.innerHTML = "Aguardando início...";
            top_timer.style.display = 'none';
            bgPos = 0;
            updateFundo();

            for (var i = 0; i < cavalos.length; i++) {
                cavalos[i].resetar();
            }
            
            mensagem.innerText = "Aguardando...";
            mensagem.style.color = "#ffd700";
        }

        setup();