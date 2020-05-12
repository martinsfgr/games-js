const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const gerarBotoes = (alfabeto) => {
  return alfabeto.split('').map(letra =>
    `
      <button id='${letra}' onclick="verificarPalpite('${letra}')">${letra}</button>
    `
  ).join('');
}

document.getElementById("keyboard").innerHTML = gerarBotoes(alfabeto);

const palavras = [
  {"dica": "Linguagem de Programação", "palavra": "Python"},
  {"dica": "Pizza", "palavra": "Portuguesa"},
  {"dica": "Filme", "palavra": "Pulp Fiction"},
  {"dica": "Série", "palavra": "The Office"},
  {"dica": "Música", "palavra": "Paranoid Android"},
  {"dica": "Banda", "palavra": "Radiohead"}
]

const selecionarResposta = () => palavras[Math.floor(Math.random()*palavras.length)];

let resposta = selecionarResposta();
let palavra = resposta.palavra;
let dica = resposta.dica;

document.getElementById("word-tip").innerHTML = dica;

const normalizarPalavra = () => {
  palavra = palavra.split('').map(letra => letra === ' ' ? '-' : letra).join('');
  return palavra.toUpperCase();
}

palavra = normalizarPalavra();
let statusPalavra;
let palpites = [];
let palpite = '';
let chances = 5;
document.getElementById("chances-remaining").innerHTML = chances;

const atualizarStatus = () => {
  statusPalavra = palavra.split('').map(letra => {
    if (letra === '-') {
      return '-';
    } else if (palpites.indexOf(letra) >= 0) {
      return letra;
    } else {
      return ' _ '
    }
  }).join('');

  document.getElementById("word").innerHTML = statusPalavra;
}

const atualizarPalpites = (letra) => {
  palpites.push(letra);
  document.getElementById(letra).setAttribute('disabled', true);
}

const verificarPalpite = (letra) => {
  atualizarPalpites(letra);

  if (palavra.indexOf(letra) >= 0) {
    atualizarStatus();
    
    console.log(`Letra ${letra} está correta`)
    console.log('Lista de Palpites:', palpites);
    console.log('Status da Palavra:', statusPalavra);

    verificarVitoria();
  } else {
    chances--;
    document.getElementById("chances-remaining").innerHTML = chances;

    console.log(`Letra ${letra} está incorreta`)
    console.log(`Agora você tem ${chances} chances`);
    console.log('Lista de Palpites:', palpites);
    console.log('Status da Palavra:', statusPalavra);

    verificarDerrota();
  }
}

const verificarVitoria = () => {
  if (statusPalavra === palavra) {
    alert('Você venceu, parabéns =)');
    window.location.reload();
  }
}

const verificarDerrota = () => {
  if (chances == 0) {
    alert('Você perdeu =(');
    window.location.reload();
  }
} 

atualizarStatus();

console.log("A dica é:", dica);
console.log("A palavra é:", palavra);
console.log("O status da palavra é:", statusPalavra);
