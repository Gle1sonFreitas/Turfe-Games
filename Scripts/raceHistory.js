var mapaIndex = 1;
var QTD_CAVALOS = parseInt(sessionStorage.QUANTIDADE_COMPETIDORES) || 4;


var velocidadeProta = sessionStorage.VELOCIDADE
var resistenceProta = sessionStorage.RESISTENCIA

if (velocidadeProta == undefined){

    velocidadeProta = 0

}


var GAME_WIDTH = game_container.offsetWidth;
var COMPRIMENTO_PISTA = GAME_WIDTH * 3;

var listarmapas = [
  {
    nome: "Mundo antigo",
    imagem: "../Assets/img/BackgroundMap1.png",
    voltas: 3,
  },
  {
    nome: "Nova Vida",
    imagem: "../Assets/img/mapa-2V4.png",
    voltas: 3,
  },
  {
    nome: "Casa dos carvalhos",
    imagem: "../Assets/img/BackgroundMap3.png",
    voltas: 3,
  },
];

var MAX_VOLTAS = 7;
if (listarmapas[mapaIndex]) {
  MAX_VOLTAS = listarmapas[mapaIndex].voltas;
}

function renderBackground() {
  if (bg_unico && listarmapas[mapaIndex]) {
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

function criarCavalo(id, numero, indiceVisual) {
  var skin = "fire";
  if (id == 0) {
    skin = "fire";
  } else {
    skin = "robot";
  }
  var framesCavalo = [
    `../Assets/race/${skin}/sprint-1.png`,
    `../Assets/race/${skin}/sprint-2.png`,
    `../Assets/race/${skin}/sprint-3.png`,
  ];

  var cavalo = {
    id: id,
    numero: numero,
    x: 50 + Math.random() * 20,
    y: 0,
    velocidadeAtual: velocidadeMundo,
    velocidadeAlvo: velocidadeMundo,
    finalizou: false,
    frameIndex: 0,
    intervaloAnimacao: null,
    escala: 0,
    tempoOscilacao: Math.random() * 10,
    elemento: document.createElement("img"),
    tempoAcumulado: 0.0,
    historicoVoltas: [],
  };

  cavalo.elemento.classList.add("cavalo");
  cavalo.elemento.src = framesCavalo[0];
  cavalo.elemento.draggable = false;

  // var label = document.createElement("div");
  // label.classList.add("numero-cavalo");
  // label.innerText = numero;
  // cavalo.elemento.appendChild(label);

  var alturaUtil = 100;
  var margemTopo = 200;
  var step = alturaUtil / QTD_CAVALOS;
  var variacaoRaia = Math.random() * 3;

  cavalo.y = margemTopo + indiceVisual * step + variacaoRaia;
  var fatorProfundidade = (cavalo.y - margemTopo) / alturaUtil;
  cavalo.escala = 0.8 + fatorProfundidade * 0.3;

  cavalo.updateVisuals = function () {
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

  cavalo.iniciarAnimacao = function () {
    if (cavalo.intervaloAnimacao) return;
    var fps = 15;
    cavalo.intervaloAnimacao = setInterval(function () {
      cavalo.elemento.src = framesCavalo[cavalo.frameIndex];
      cavalo.frameIndex++;
      if (cavalo.frameIndex >= framesCavalo.length) cavalo.frameIndex = 0;
    }, 1000 / fps);
  };

  cavalo.pararAnimacao = function () {
    if (cavalo.intervaloAnimacao) {
      clearInterval(cavalo.intervaloAnimacao);
      cavalo.intervaloAnimacao = null;
    }
  };

  cavalo.correr = function () {
    if (cavalo.finalizou) return false;

    var inercia = 0.02;
    cavalo.velocidadeAtual +=
      (cavalo.velocidadeAlvo - cavalo.velocidadeAtual) * inercia;

    var deslocamento = cavalo.velocidadeAtual - velocidadeMundo;
    cavalo.x += deslocamento;

    cavalo.updateVisuals();

    if (cavalo.x >= GAME_WIDTH - 515) {
      cavalo.finalizou = true;
      return true;
    }
    return false;
  };

  cavalo.remover = function () {
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

    if (i == 0){
        for (var v = 0; v < MAX_VOLTAS; v++) {
        var tempoVolta = Math.random() * 2 + (7 - velocidadeProta);
        var tempoFormatado = parseFloat(tempoVolta.toFixed(1));
        c.tempoAcumulado += tempoFormatado;
        c.historicoVoltas.push(tempoFormatado);
        }
    }else {
        for (var v = 0; v < MAX_VOLTAS; v++) {
        var tempoVolta = Math.random() * 2 + 3;
        var tempoFormatado = parseFloat(tempoVolta.toFixed(1));
        c.tempoAcumulado += tempoFormatado;
        c.historicoVoltas.push(tempoFormatado);
        }
    }

    if (c.tempoAcumulado < menorTempoTotal) menorTempoTotal = c.tempoAcumulado;
    if (c.tempoAcumulado > piorTempoTotal) piorTempoTotal = c.tempoAcumulado;
  }

  for (var i = 0; i < cavalos.length; i++) {
    var c = cavalos[i];

    var fatorDesempenho = 0;
    if (piorTempoTotal !== menorTempoTotal) {
      fatorDesempenho =
        (piorTempoTotal - c.tempoAcumulado) /
        (piorTempoTotal - menorTempoTotal);
    } else {
      fatorDesempenho = 0.5;
    }

    c.velocidadeAlvo = velocidadeMundo + 0.5 + fatorDesempenho * 2.0;
  }
}

function iniciarExibicaoLogs() {
  conteudo_logs.innerHTML = "";
  var voltaExibida = 0;

  intervaloVisualLog = setInterval(function () {
    if (voltaExibida >= MAX_VOLTAS) {
      clearInterval(intervaloVisualLog);
      return;
    }

    var htmlVolta =
      "<strong>--- Volta " + (voltaExibida + 1) + " ---</strong><br>";

    for (var i = 0; i < cavalos.length; i++) {
      var c = cavalos[i];
      var tempo = c.historicoVoltas[voltaExibida];

      var somaAteAgora = 0;
      for (var k = 0; k <= voltaExibida; k++)
        somaAteAgora += c.historicoVoltas[k];

      htmlVolta +=
        (c.numero == 1 ? 'Wynonna Earp' : 'Robot Bill') +
        ": " +
        tempo.toFixed(1) +
        "s (Total: " +
        somaAteAgora.toFixed(1) +
        "s)<br>";
    }

    conteudo_logs.innerHTML += "<div class='log-entry'>" + htmlVolta + "</div>";
    ui.scrollTop = ui.scrollHeight;

    voltaExibida++;
  }, 2000);
}

function setup() {
  cavalos = [];

  for (var i = 0; i < QTD_CAVALOS; i++) {
    var novoCavalo = criarCavalo(i, i + 1, i);
    cavalos.push(novoCavalo);
  }
  updateFundo();
  prepararLargada();
}

function updateFundo() {
  bgPos -= velocidadeMundo;
  if (bg_unico) bg_unico.style.backgroundPositionX = bgPos + "px";
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
    finalizarCorrida();
  } else {
    loopId = requestAnimationFrame(gameLoop);
  }
}

function finalizarCorrida() {
  corridaAndando = false;
  if (intervaloVisualLog) clearInterval(intervaloVisualLog);

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

  var msg = mensagem;
  msg.innerText = `VENCEDOR: ${
    (campeao.numero == 1 ? 'Wynonna Earp' : 'Robot Bill')
  } (Tempo: ${campeao.tempoAcumulado.toFixed(1)}s)`;
  msg.style.color = "#fff";

  campeao.elemento.style.zIndex = 9999;
  campeao.elemento.style.transform += " scale(1.2)";

  var painel = conteudo_logs;
  painel.innerHTML +=
    "<div class='log-entry' style='color:#ffd700; font-weight:bold; border-top:1px solid #ffd700; margin-top:10px;'>FIM DA CORRIDA</div>";


  if (campeao.numero == 1) {
    sessionStorage.TEMP_ACUMULADO = campeao.tempoAcumulado
    setTimeout((window.location = "./Vitoria.html"), 1000);

  } else {
    setTimeout((window.location = "./upgrade.html"), 3000);
  }
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
  top_timer.style.display = "block";
  top_timer.innerText = count;

  var countdownInterval = setInterval(function () {
    count--;
    if (count > 0) {
      top_timer.innerText = count;
    } else {
      clearInterval(countdownInterval);
      top_timer.innerText = "JÁ!";
      setTimeout(function () {
        top_timer.style.display = "none";
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

setup();
