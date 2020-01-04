window.onload =	function() {document.getElementById('tabuleiro').style.visibility = 'hidden';
                            document.getElementById('placar').style.visibility = 'hidden';
                            document.getElementById('mostrador').style.visibility = 'hidden';
                            document.getElementById('mostradorX').style.visibility = 'hidden';
                            document.getElementById('mostradorO').style.visibility = 'hidden';
                        }

iniciarJogo = function(){
    document.getElementById('tabuleiro').style.visibility = 'visible';
    document.getElementById('placar').style.visibility = 'visible';
    document.getElementById('mostrador').style.visibility = 'visible';
    document.getElementById('mostradorX').style.visibility = 'visible';
    document.getElementById('home').style.visibility = 'hidden';
}

let jogadorX = document.getElementById('jogadorX');
let jogadorO = document.getElementById('jogadorO');
let placarX = document.getElementById('placarx');
let placarO = document.getElementById('placaro');
let pX = 0;
let pO = 0;

let imgx = 'url(img/x.png)';
let imgo = 'url(img/o.png)';

let divs = document.querySelectorAll("section");

// function sortearJogador(max = 3, min = 1){
//     return Math.floor(Math.random()*(max - min))+min;
// }

let click = 2;

function atualizarMostrador(){
    if(click % 2 == 0){
        document.getElementById('mostradorX').style.visibility = 'visible';
        document.getElementById('mostradorO').style.visibility = 'hidden';
        document.getElementById('pxid').style.backgroundColor = "lightgray";
        document.getElementById('poid').style.backgroundColor = "aliceblue";
    }else{
        document.getElementById('mostradorX').style.visibility = 'hidden';
        document.getElementById('mostradorO').style.visibility = 'visible';
        document.getElementById('pxid').style.backgroundColor = "aliceblue";
        document.getElementById('poid').style.backgroundColor = "lightgray";
    }
}

function clicar(event){
    console.log(click);
    if(event.target.classList.contains('X') || (event.target.classList.contains('O'))){
        alert('Jogava inválida. Tente novamente!');
    }
    
    else if(click % 2 == 0){
        event.target.style.backgroundImage = imgx;
        event.target.classList.add('X')
        click++;
        validarVitoria();
        atualizarMostrador();
        terminarJogo();
    }
    
    else{
        event.target.style.backgroundImage = imgo;
        event.target.classList.add('O')
        click++;
        validarVitoria();
        atualizarMostrador();
        terminarJogo();
    }   
}

for(let div of divs){
    div.onclick = clicar;
}

function validarVitoria(){

    //validarVitoriaX
    if(divs[0].classList.contains('X') && divs[1].classList.contains('X') && divs[2].classList.contains('X') ||
       divs[3].classList.contains('X') && divs[4].classList.contains('X') && divs[5].classList.contains('X') ||
       divs[6].classList.contains('X') && divs[7].classList.contains('X') && divs[8].classList.contains('X') ||
       divs[0].classList.contains('X') && divs[4].classList.contains('X') && divs[8].classList.contains('X') ||
       divs[2].classList.contains('X') && divs[4].classList.contains('X') && divs[6].classList.contains('X') ||
       divs[0].classList.contains('X') && divs[3].classList.contains('X') && divs[6].classList.contains('X') ||
       divs[1].classList.contains('X') && divs[4].classList.contains('X') && divs[7].classList.contains('X') ||
       divs[2].classList.contains('X') && divs[5].classList.contains('X') && divs[8].classList.contains('X') ){
        alert(`${jogadorX.value} foi o vencedor da rodada!`);
        pX++;
        placarX.innerHTML = pX.toString();
        limparTabuleiro();
        }

    //validarVitoriaO
    else if(divs[0].classList.contains('O') && divs[1].classList.contains('O') && divs[2].classList.contains('O') ||
            divs[3].classList.contains('O') && divs[4].classList.contains('O') && divs[5].classList.contains('O') ||
            divs[6].classList.contains('O') && divs[7].classList.contains('O') && divs[8].classList.contains('O') ||
            divs[0].classList.contains('O') && divs[4].classList.contains('O') && divs[8].classList.contains('O') ||
            divs[2].classList.contains('O') && divs[4].classList.contains('O') && divs[6].classList.contains('O') ||
            divs[0].classList.contains('O') && divs[3].classList.contains('O') && divs[6].classList.contains('O') ||
            divs[1].classList.contains('O') && divs[4].classList.contains('O') && divs[7].classList.contains('O') ||
            divs[2].classList.contains('O') && divs[5].classList.contains('O') && divs[8].classList.contains('O') ){
        alert(`${jogadorO.value} foi o vencedor da rodada!`);
        limparTabuleiro();
        pO++;
        placarO.innerHTML = pO.toString();
    }else{
        verificarVelha();
    }
}

function verificarVelha(){
    let jogadas = 0;
    for (let index = 0; index <= divs.length - 1; index++){
        if(divs[index].classList != ''){
            jogadas++
            if(jogadas == divs.length){
                alert("EMPATE! O jogo deu velha.");
                limparTabuleiro();
                // window.location.reload();
            }
        }
    }
}

function limparTabuleiro(){
    for(let div of divs){
        div.classList = '';
        div.style.backgroundImage = '';
    }
}

function terminarJogo(){
    if(pX == 3){
        alert(`${jogadorX.value} ganhou a melhor de 5! Parabéns!`);
        window.location.reload();
    }
    else if(pO == 3){
        alert(`${jogadorO.value} ganhou a melhor de 5! Parabéns!`);
        window.location.reload();
    }
}