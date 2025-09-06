// ARRAYS

// let array = [5, 2, 3, 4, 5, 6]; Original
// array = [5, 2, 3, 4, 2, 6]; Muda o 5º elemento
// array[4] = 2 muda o 5º elemento do jeito certo
// array.length tamanho do array
// array.post adiciona um no final
// array.slice corta o array
// array = [...array2] os ... pega apenas os dados do array

// Crie 10 perguntas de multipla escolha com o tema 
// principal, arrays em JS, faça perguntas teóricas, 
// ache o erro e qual a saida foque apenas na manipulação 
// de arryas de forma simples e com o for não faça 
// perguntas de funções expecificas do JS com exceção 
// do .post e .slice.

// DESAFIO 1:
// Faça um algoritmo que receba o seguinte array de 
// números: [50, 10, 1, 30, 20, 2, 5, 9, 15]. O seu 
// objetivo é ordenar este array do menor para o 
// maior valor.

let array = [50, 10, 1, 30, 20, 2, 5, 9, 15];
let contaVoltas = 0;
let contaMudanca = 0;
for (let volta = array.length; volta > 0; volta--) {
    for (let i = 0; i < volta; i++) {
        if (array[i] > array[i + 1]) {
            let varAux = array[i];
            array[i] = array[i + 1];
            array[i + 1] = varAux;
            contaMudanca++;
        }
        contaVoltas++;
    }
}
console.log(array);
console.log(contaVoltas);
console.log(contaMudanca);


// DESAFIO 2
// Faça um algoritmo que analise a seguinte string:
// "Aprender programacao exige pratica e dedicacao
// constante". O seu objetivo é contar quantas vezes
// cada letra aparece na frase.

// DESAFIO 3
//Faça um algoritmo que comece com os dois seguintes
// arrays de números:
// Array A: [3, 10, 15, 22, 8, 19, 30, 42]
// Array B: [5, 12, 1, 25, 18, 7, 27, 33]
// O seu objetivo é processar ambos os arrays e criar
// dois novos arrays: um contendo apenas os números pares
// de A e B, e outro contendo apenas os números ímpares
// de A e B. Após popular os novos arrays, ordene ambos
// de forma decrescente (do maior para o menor) e exiba
// os dois arrays resultantes no console.