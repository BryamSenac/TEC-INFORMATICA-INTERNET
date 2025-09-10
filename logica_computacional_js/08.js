//MATRIZES

// const matriz = [
//     [2,3,4,5],
//     [2,3,4,5],
//     [2,3,4,5],
// ]

// for(let i = 0; i < matriz[0].length; i++){
//     let media = 0;
//     for(let j = 0; j < matriz.length; j++){
//         media += matriz[j][i];
//     }
//     console.log(media/3)
// }

// Crie um questionario com 10 perguntas sobre matrizes 
// no JS, faça perguntas do tipo, qual a saida, teoricas
// e onde está o erro, use todos os conteudos de js com 
// exeção de objetos, faça um questionario multipla escolha.


//Faça o JOGO da VELHA!

const input = require('prompt-sync')();

let jogador1 = true;
let jogando = true;
let turnos = 0;

let jogadas = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
]

let tabuleiro;
function desenharTabuleiro(jogadas) {
    tabuleiro = [
        [' ', '0', '1', '2'],
        ['0', jogadas[0][0], jogadas[0][1], jogadas[0][2]],
        ['1', jogadas[1][0], jogadas[1][1], jogadas[1][2]],
        ['2', jogadas[2][0], jogadas[2][1], jogadas[2][2]],
    ]
    console.log(tabuleiro);
}

function marcarPonto(linha, coluna) {
    if (jogadas[linha][coluna] != ' ') {
        console.log("Jogada invalida joque novamente!")
    } else {
        if (jogador1) {
            jogadas[linha][coluna] = 'X';
        } else {
            jogadas[linha][coluna] = 'O';
        }
        checaVitoria();
    }
}

function checaVitoria() {
    //Verifica diagonais
    if (jogadas[1][1] != ' ') {
        if (jogadas[0][0] == jogadas[1][1] && jogadas[2][2] == jogadas[1][1]) {
            jogando = false;
        }
        if (jogadas[0][2] == jogadas[1][1] && jogadas[2][0] == jogadas[1][1]) {
            jogando = false;
        }
    }
    //Verifica todas as linhas
    for (let i = 0; i < 3; i++) {
        if (jogadas[i][0] == jogadas[i][1] && jogadas[i][2] == jogadas[i][1] && jogadas[i][0] != ' ') {
            jogando = false;
        }
    }
    //Verifica todas as colunas
    for (let i = 0; i < 3; i++) {
        if (jogadas[0][i] == jogadas[1][i] && jogadas[2][i] == jogadas[1][i] && jogadas[0][i] != ' ') {
            jogando = false;
        }
    }
    turnos++;
    console.log(turnos);
    //checa fim e jogo
    if (!jogando || turnos >= 8) {
        if (jogador1) {
            console.log('X ganhou');
        } else {
            console.log('O ganhou');
        }
    } else {
        jogador1 = !jogador1;
    }
}

desenharTabuleiro(jogadas);
while (jogando || turnos < 9) {
    let linha = parseInt(input('Digite a linha da jogada: '));
    let coluna = parseInt(input('Digite a coluna da jogada: '));
    marcarPonto(linha, coluna);
    desenharTabuleiro(jogadas);
}