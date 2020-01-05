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


// FLUXO DAS FUNÇÕES:

// 1. O jogo vai deixar aberto todas as cartas através do for da linha 92
//    e executando a função abrirCarta(); na linha 93.

// 2. As cartas ficarão abertas apenas por 1 segundo, assim como é definido no
//    setTimeout na linha 96, onde é executado a função iniciarJogada() que, por sua vez,
//    define as duas cartas como indefinidas e chama a função bloquearEncontradas para ser executada.

// 3. A função bloquearEncontradas() percorre toda a lista de cartas e verifica se
//    elas já foram encontradas pelo jogador através da classe daquele elemento.
//    No caso de ainda não ser encontrado, todas as cartas que satisfizerem essa condição
//    serão escondidas através da função esconderCarta().

// 4. Sendo chamada a função esconderCarta(), é dentro dela onde se começa de fato as
//    ações determinadas pelo jogador, pois na linha 37 é definido que, no momento em que
//    o jogador clicar em cima de alguma carta, a função executarJogada() é chamada.
//    Ou seja, é importante notar que apenas as cartas que ainda não foram encontradas são clicáveis,
//    afinal, se enquadram na função esconderCarta() apenas aquelas cartas que foram filtradas
//    pela função bloquearEncontradas().

// 5. Por sua vez, a função executarJogada() chama, primeiramente, a função abrirCarta,
//    definindo como argumento de 'carta', o event.target, ou seja, aquele elemento que clicarmos.
//    Após o jogador selecionar as duas cartas, o click é travado até que aa função 
//    compararImagens() seja executada.

// 6. A função compararImagens() vai verificar através do backgroundImage se aquelas cartas
//    são pares. Caso sejam, os dois elementos terão uma classe adicionada e serão travadas
//    pela função bloquearEncontradas() e, posteriormente, a função iniciarJogada() é chamada
//    e todo processo se inicia novamente. Caso as cartas não sejam pares, elas são escondidas
//    e a função iniciarJogada() é chamada e todo o processo se inicia novamente.
