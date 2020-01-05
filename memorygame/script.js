let primeiraCarta;
let segundaCarta;

let cartas = document.getElementsByClassName('cards');
console.log(cartas)

let imagens = ["babyfaust.jpg", "cakefaust.jpg", "coolfaust.jpg", "darkfaust.jpg", "erroufaust.jpg", "kingfaust.jpg"];
let imagensDuplicadas = imagens.concat(imagens);
console.log('Essa é a lista duplicada', imagensDuplicadas);

function embaralharCartas(listaImagens){
    let posicaoAleatoria;
    let posicaoIterador;

    for(let i = listaImagens.length - 1; i !== 0; i--){
        posicaoAleatoria = Math.floor(Math.random() * i);

        posicaoIterador = listaImagens[i];
        listaImagens[i] = listaImagens[posicaoAleatoria];
        listaImagens[posicaoAleatoria] = posicaoIterador;
    }

    return listaImagens;
}

let imagensEmbaralhadas = embaralharCartas(imagensDuplicadas);
console.log('Essa é a lista embaralhada', imagensEmbaralhadas);

function abrirCarta(carta){
    carta.style.backgroundImage = `url(img/${imagensEmbaralhadas[Number(carta.id)]})`;
    console.log(carta.style.backgroundImage);
    carta.onclick = null;
}

function esconderCarta(carta){
    carta.style.backgroundImage = "url('img/pngfaust.png')"
    carta.onclick = executarJogada;
}

function bloquearEncontradas(){
    for(let carta of cartas){
        if(!carta.classList.contains("encontrado")){
            esconderCarta(carta);
        }
    }
}

function iniciarJogada(){
    primeiraCarta = null;
    segundaCarta = null;
    console.log('Olha, a primeira carta agora é assim: ', primeiraCarta);
    console.log('Olha, a segunda carta agora é assim: ', segundaCarta);
    bloquearEncontradas();
}

function compararImagens(){
    if(primeiraCarta.style.backgroundImage !== segundaCarta.style.backgroundImage){
        setTimeout(function(){
            esconderCarta(primeiraCarta);
            esconderCarta(segundaCarta);
            console.log('Não são iguais :(');
            iniciarJogada();
        }, 1000);
    }else{
        primeiraCarta.classList.add("encontrado");
        segundaCarta.classList.add("encontrado");
        console.log('São iguais! :)');
        iniciarJogada();
    }
}

function travarClick(){
    for(let carta of cartas){
        carta.onclick = null;
        console.log('Tô travando o clique :)');
    }
}

function executarJogada(event){
    abrirCarta(event.target);
    if (primeiraCarta){
        segundaCarta = event.target;
        console.log('Sou a segunda carta', segundaCarta);
        travarClick();
        compararImagens();
    }else{
        primeiraCarta = event.target;
        console.log('Sou a primeira carta: ', primeiraCarta);
    }
}

for(carta of cartas){
    abrirCarta(carta);
}

setTimeout(() => {
    iniciarJogada();
}, 1000);
