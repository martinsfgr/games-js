const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const gerarBotoes = (alfabeto) => {
  return alfabeto.split('').map(letra =>
    `
      <button id='${letra}' onclick="verificarPalpite(${letra})">${letra}</button>
    `
  ).join('');
}

document.getElementById("keyboard").innerHTML = gerarBotoes(alfabeto);
