const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');

let textoFoco = 'Otimize sua produtividade,'
let textoFocoStrong = 'mergulhe no que importa'
let textoCurto = 'Que tal dar uma respirada?'
let textoCurtoStrong = 'Faça uma pausa curta!'
let textoLongo = 'Hora de voltar à superfície'
let textoLongoStrong = 'Faça uma pausa longa'

const musicaFundo = new Audio('sons/luna-rise-part-one.mp3');
const somStart = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somFim = new Audio('/sons/beep.mp3');

const botaoMusica = document.getElementById("alternar-musica");
musicaFundo.loop = true;

const botaoComecarContagem = document.querySelector('#start-pause');
const timer =  document.querySelector('#timer');
let intervaloContagem = null;
let tempoTotal = 1500;

const imagemBtPausarComecar = botaoComecarContagem.querySelector('img');

//funcao principal que muda todo o tema da pagina
function mudaTema(botao , valorAtributo) {
    botao.addEventListener('click', function () {
        const mensagem = confirm('Deseja realmente trocar de foco?');
        if (mensagem) {
            if (botao == botaoCurto) {
            tempoTotal = 300;
            }
            if (botao == botaoLongo) {
                tempoTotal = 900;
            }
            if (botao == botaoFoco) {
                tempoTotal = 1500;
            }
            html.setAttribute('data-contexto' , valorAtributo);
            desativaBotoes();
            botao.classList.add('active');
            trocaImagemFundo(valorAtributo);
            trocaTexto(botao);
            zerarContagem();
            botaoComecarContagemIniciar();
            mostrarNaTela();
        } else {
            return;
        }
        
    })
}


//funcao adicionada na funcao mudaTema
function desativaBotoes() {
    botoesAtivos = document.querySelectorAll('.active')
    botoesAtivos.forEach(botaoAtivo => {
        botaoAtivo.classList.remove('active')
    });
}

//funcao adicionada na funcao mudaTema
function trocaImagemFundo(valorAtributo) {
    let imagemFundoNova = document.querySelector('.app__image');
    imagemFundoNova.setAttribute('src' , `/imagens/${valorAtributo}.png`); 
}

//funcao adicionada na funcao mudaTema
function trocaTexto(botao) {
    let texto = document.querySelector('.app__title');
    switch (botao) {
        case botaoFoco:
            texto.innerHTML = `${textoFoco}<br> <strong class="app__title-strong">${textoFocoStrong}</strong>`;
            break;
        case botaoCurto:
            texto.innerHTML = `${textoCurto}?<br> <strong class="app__title-strong">${textoCurtoStrong}</strong>`;
            break;
        case botaoLongo:
            texto.innerHTML = `${textoLongo}<br> <strong class="app__title-strong">${textoLongoStrong}</strong>`;
            break;
        default:
            break;
    }
    
}

//função que chama a logica escrita anteriormente para troca do tema da pagina consoante os parametros.
mudaTema(botaoFoco , 'foco');
mudaTema(botaoCurto , 'descanso-curto');
mudaTema(botaoLongo , 'descanso-longo');

//tocar musica quando clicar no botao musica e pausa ao clicar novamente
botaoMusica.addEventListener('change' , () => {
    if (musicaFundo.paused) {
        musicaFundo.play();
    } else {
        musicaFundo.pause();
    } 
})

//logica de decrementação do tempo total utilizada na função iniciarPausarTempo
const contagem =  () => {
    if (tempoTotal <= 0) {
        zerarContagem();
        somFim.play();
        alert('Tempo esgotado!');
        return;
    }
    tempoTotal -= 1;
    mostrarNaTela();
}

//evento de click no botao que chama a função iniciarPausarTempo
botaoComecarContagem.addEventListener('click' , iniciarPausarTempo);

//função que inicia ou pausa o cronometro, chamada no evento acima. Atraves do setInterval, chama a função contagem a cada 1000 milisegundos(1s)
function iniciarPausarTempo() {
    if (intervaloContagem) {
        zerarContagem();
        somPause.play();
        botaoComecarContagemIniciar();
        return;   
    }
    intervaloContagem = setInterval(contagem , 1000);
    somStart.play();
    botaoComecarContagem.querySelector('span').textContent = 'Pausar'
    imagemBtPausarComecar.setAttribute('src' , '/imagens/pause.png')
}

//função que zera o intervalo para poder pausar o cronometro. funcao adicionada na funcao iniciarPausarTempo
function zerarContagem() {
    clearInterval(intervaloContagem);
    intervaloContagem = null;
}

//funcao que zera o botao de contagem, deixando ele em modo "começar"
function botaoComecarContagemIniciar() {
    botaoComecarContagem.querySelector('span').textContent = 'Começar'
    imagemBtPausarComecar.setAttribute('src' , '/imagens/play_arrow.png')
}

//funcao que mostra o cronometro na tela. funcao adicionada na funcao contagem
function mostrarNaTela(){
    const tempo =  new Date(tempoTotal * 1000);
    const tempoFormatado = tempo.toLocaleTimeString([] , {minute : '2-digit' , second : '2-digit'})
    timer.textContent = tempoFormatado;
}

mostrarNaTela();
