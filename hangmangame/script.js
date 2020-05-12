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
  if (chances == -1) {
    alert('Você perdeu =(');
    window.location.reload();
  }
} 

atualizarStatus();

console.log("A dica é:", dica);
console.log("A palavra é:", palavra);
console.log("O status da palavra é:", statusPalavra);


// FLUXO DAS FUNÇÕES:

// 1. O arquivo vai ser executado e, de primeiro momento, vai ser escolhido um objeto com 
// alguma palavra e, em seguida, a função atualizarStatus(); é executada (linha 99).
// A função atualizarStatus() passa por cada uma das letras da palavra, verificando se ela
// existe dentro da lista de palpites. Porém, como a lista de palpites começa vazia, o retorno da função
// vai ser todas as letras da palavras transformadas em underlines.

// 2. Fica a disposição do usuário, clicar em qualquer botão disponível da tela, do qual foi gerado
// automaticamente com o id letra correspondente, junto com um evento de onclick, que executa a função
// verificarPalpite(), que tem como parâmetro o id do botão que foi clicado.

// 3. A função verificarPalpite(letra), quando executada, desabilita o botão, para que aquela letra não
// seja mais acessada e atualiza a lista de palpites com a letra
// passada pelo parâmetro e, em seguida, verifica se essa letra existe na palavra. Se sim, a função
// atualizarStatus(); é executada para substituir todos os underlines pela letra correta, de acordo
// com o que foi adicionado dentro da lista de palpites.

// 4. A cada vez que um palpite for correto, a função verificarVitoria(); é executada para verificar
// se todas se todos os underlines foram substituídos por alguma letra e se está exatamente igual a
// palavra sorteada.

// 5. A cada vez que um palpite for incorreto, o número de chances diminui, até que o usuário não 
// possa mais jogar e, assim, reiniciando a página.
