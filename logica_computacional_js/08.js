const matriz = [
    [2,3,4,5],
    [2,3,4,5],
    [2,3,4,5],
]

for(let i = 0; i < matriz[0].length; i++){
    let media = 0;
    for(let j = 0; j < matriz.length; j++){
        media += matriz[j][i];
    }
    console.log(media/3)
}

// Crie um questionario com 10 perguntas sobre matrizes 
// no JS, faça perguntas do tipo, qual a saida, teoricas
// e onde está o erro, use todos os conteudos de js com 
// exeção de objetos, faça um questionario multipla escolha.