//FUNÇÕES

// const input = require('prompt-sync')();

// function mostrarExtrato(valor) {
//     console.log(`Seu saldo atual é de: ${valor}`);
// }

// function mostrarMenu() {
//     console.log("[3]Saque");
//     console.log("[2]Deposito");
//     console.log("[1]Extrato");
//     console.log("[0]Sair");
// }

// function pedirValor() {
//     return parseFloat(input("Digite quanto: "));
// }

// function saque(valorConta) {
//     let valorPedido = pedirValor()
//     if ((valorConta - valorPedido) < 0) {
//         console.log("Valor maior que o saldo:");
//         return valorConta;
//     } else {
//         return valorConta - valorPedido;
//     }
// }

// function deposito(valorConta) {
//     return valorConta + pedirValor();
// }

// function caixaEletronico(valorConta) {
//     let op;
//     do {
//         mostrarMenu();
//         op = input("Escolha uma OP");

//         switch (op) {
//             case '3':
//                 valorConta = saque(valorConta);
//                 mostrarExtrato(valorConta);
//                 break;
//             case '2':
//                 valorConta = deposito(valorConta);
//                 mostrarExtrato(valorConta);
//                 break;
//             case '1':
//                 mostrarExtrato(valorConta);
//                 break;
//             case '0':
//                 console.log('Saindo');
//                 break;
//             default:
//                 console.log('Opção de menu invalida, tente novamente');
//                 break;
//         }
//     } while (op != 0);
// }

// let op;
// do {
//     console.log("[3]Bryam");
//     console.log("[2]Gabriel");
//     console.log("[1]Lucas");
//     console.log("[0]Sair");
//     op = input("Escolha uma OP");

//     switch (op) {
//         case '3':
//             caixaEletronico(115);
//             break;
//         case '2':
//             caixaEletronico(300);
//             break;
//         case '1':
//             caixaEletronico(5);
//             break;
//         case '0':
//             console.log('Saindo');
//             break;
//         default:
//             console.log('Opção de menu invalida, tente novamente');
//             break;
//     }
// } while (op != 0);


// Crie um questionario multipla escolha com 20 questões sobre 
// funções em JS, aplique com os conteuds de laços, condicionais, 
// parametros, retorno e entrada de dados, não utilize conteudos de
// aroow functions, vetores e objetos, crie perguntas do tipo, teórico,
// ache o erro, qual a saida e qual o codigo correto. 

//Desaio 1:
// Faça um algoritmo que possua uma função chamada calcularFatorial. 
// Essa função deve:
// Receber um único número inteiro e positivo como parâmetro.
// Usar um laço de repetição (for ou while) para calcular o fatorial 
// do número.
// Retornar o resultado do cálculo.
// No corpo principal do seu script, peça ao usuário para digitar um 
// número, chame a função calcularFatorial passando o número do usuário 
// e, por fim, exiba uma mensagem formatada com o resultado retornado 
// pela função.

// const input = require('prompt-sync')();
// function calcularFatorial(numero) {
//     let resultado = 1;
//     for (let i = numero; i > 0; i--) {
//         resultado = resultado * i
//     }
//     return resultado;
// }
// let numero;
// do {
//     numero = parseInt(input("Digite um número: "));
// } while (numero <= 0);
// console.log(`Resultado do fatorial de ${numero} é ${calcularFatorial(numero)}`);

//Desaio 2:
// Faça um algoritmo que possua uma função chamada analisarNumero.
// A função deve:
// Receber um número inteiro como parâmetro.
// Verificar se o número é par ou ímpar.
// Verificar se o número é positivo, negativo ou zero.
// Usando essas informações, a função deve retornar uma string
// descritiva, como "Número Par e Positivo", "Número Ímpar e Negativo",
// ou "Zero".
// No corpo principal do script, use um laço de repetição que peça ao
// usuário para digitar 3 números. Para cada número digitado, chame
// a função analisarNumero e exiba o resultado que ela retornou.

// const input = require('prompt-sync')();
// function ehPar(numero){
//     if(numero % 2 == 0){
//         return ' e PAR';
//     }else{
//         return ' e IMPAR';
//     }
// }
// function analisarNumero(numero) {
//     if (numero === 0) {
//         return ' Número ZERO';
//     } else if (numero < 0) {
//         return 'Número NEGATIVO' + ehPar(numero);
//     } else if (numero > 0) {
//         return ' Número POSITIVO' + ehPar(numero);
//     } else {
//         return 'Não é Número'
//     }
// }
// for (let i = 0; i < 3; i++){
//     console.log(analisarNumero(parseInt(input("Digite um número: "))));
// }

//Desaio 3:
// Faça um algoritmo que possua uma função chamada ehPrimo.
// A função deve:
// Receber um número inteiro e positivo como parâmetro.
// Usar um laço de repetição e condicionais para verificar
// se o número é primo (divisível apenas por 1 e por ele mesmo).
// Retornar true se o número for primo, e false caso contrário.
// No corpo principal do script, peça ao usuário um número N.
// Em seguida, crie um laço que percorra todos os números de 1
// até N, chamando a função ehPrimo para cada um deles. O script
// deve contar quantos números primos foram encontrados nesse
// intervalo e exibir a contagem total no final.

// const input = require('prompt-sync')();
// function ehPrimo(numero){
//     for(let i = 2; i < numero ; i++){
//         if(numero % i == 0){
//             return false
//         }
//     }
//     return true
// }
// let numero = input("Digite um número: ");
// let contagem = 0;
// for(let i = 1; i < numero; i++){
//     if(ehPrimo(i + 1)){
//        contagem++; 
//     }
// }
// console.log(`Existem ${contagem} número primos`)

// ARROW FUNCTION OU FUNÇÃO ANÔNIMA
// const funcao = ()=>{}
// Fução ignorada pelo navegador no carregamento do arquivo