//OBJETO

// const objeto = {
//     noma: 'Bryam',
//     idade: 25,
//     notas: {
//         pt: 5,
//         lg: 10,
//         mt: 7,
//     }
// }

// const objetos = [
//     {
//         nome: 'Bryam',
//         idade: 26,
//     },
//     {
//         nome: 'Lucas',
//         idade: 17,
//     },
//     {
//         nome: 'Tiago',
//         idade: 23,
//     }
// ]


// Faça um algoritmo que simule o processamento de um 
// pedido em um sistema de e-commerce. Você receberá 
// duas estruturas de dados principais: um estoque 
// de produtos (um array de objetos {nome, R$un, qnt}) 
// e um carrinho de compras ({nomeCli, R$total, [prod]}).
// Seu objetivo é criar um algoritmo que desconta todos 
// os produtos do carrinho no estoque mostra o estoque 
// atualizado e o valor total do carrinho.

const estoque = [
    { nome: "Notebook Gamer Pro", valorUnitario: 8500.00, qnt: 15 },
    { nome: "Mouse Óptico RGB", valorUnitario: 250.50, qnt: 80 },
    { nome: "Teclado Mecânico", valorUnitario: 480.00, qnt: 55 },
    { nome: "Monitor UltraWide 34\"", valorUnitario: 3200.00, qnt: 25 },
    { nome: "Headset Surround 7.1", valorUnitario: 650.75, qnt: 40 },
    { nome: "Cadeira Gamer Ergonômica", valorUnitario: 1800.00, qnt: 30 },
    { nome: "SSD NVMe 2TB", valorUnitario: 1100.00, qnt: 100 },
    { nome: "Webcam 4K", valorUnitario: 950.00, qnt: 50 },
    { nome: "Microfone Condensador USB", valorUnitario: 780.00, qnt: 65 },
    { nome: "Mousepad Gamer XXL", valorUnitario: 180.50, qnt: 150 },
    { nome: "Placa de Vídeo RTX 5080", valorUnitario: 9800.00, qnt: 10 }
];

const carrinho = {
    nomeCliente: 'Bryam',
    valorTontal: 0,
    produtosCarrinho: 
    [
        { nome: "Notebook Gamer Pro", valorUnitario: 8500.00, qnt: 1 },
        { nome: "Teclado Mecânico", valorUnitario: 480.00, qnt: 2 },
        { nome: "Headset Surround 7.1", valorUnitario: 650.75, qnt: 1 }
    ]
};

for(let i = 0; i < carrinho.produtosCarrinho.length; i++){
    carrinho.valorTontal += carrinho.produtosCarrinho[i].valorUnitario * carrinho.produtosCarrinho[i].qnt;
}
console.log(`Total do carrinho: ${carrinho.valorTontal}`);


for(let i = 0; i < carrinho.produtosCarrinho.length; i++){
    for(let j = 0; j < estoque.length; j++){
        if(carrinho.produtosCarrinho[i].nome == estoque[j].nome){
            estoque[j].qnt -= carrinho.produtosCarrinho[i].qnt;
        }
    }
}

console.log(estoque);