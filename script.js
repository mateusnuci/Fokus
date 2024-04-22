const html = document.querySelector('html')
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')

const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const play =  new Audio('sons/play.wav')
const pause = new Audio('sons/pause.mp3')
musica.loop = true


const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900;

const startPauseBt = document.querySelector('#start-pause span')
let tempoDecorridoEmSegundos = duracaoFoco
let intervaloId = null;


musicaFocoInput.addEventListener('change', () => {
  if(musica.paused) {
          musica.play()
      } else {
          musica.pause()
      }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoFoco
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoDescansoCurto
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoDescansoLongo
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
  })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
          titulo.innerHTML = `Otimize sua produtividade,<br>
          <strong class="app__title-strong">mergulhe no que importa.</strong>`
          break;
        case 'descanso-curto':
          titulo.innerHTML = `
          Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
          ` 
          break;
        case 'descanso-longo':
          titulo.innerHTML = `
          Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
          `
        default:
          break;
    }
  
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    zerar()
    alert('tempo finalizado')
    return
  }
  tempoDecorridoEmSegundos -= 1
  mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
  if (intervaloId) {
    zerar()
    return
  }
  intervaloId = setInterval(contagemRegressiva, 1000)
  startPauseBt.textContent = "Pausar"
}

function zerar() {
  clearInterval(intervaloId)
  startPauseBt.textContent = "Começar"
  intervaloId = null
}

startPauseBt.addEventListener('click', () => {
  if (intervaloId) {
    play.play()
  } else {
    pause.play()
  }

})

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000) 
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
  displayTempo.innerHTML = `${tempoFormatado}`
}

mostrarTempo()