import express from 'express';
import mockCards from '../models/cardsBD.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log(mockCards);
    res.status(200).json(mockCards);
});

router.post('/', (req, res) => {
    const { title, price, imageUrl } = req.body;

    if (!title || !price || !imageUrl) {
        return res.status(400).send('Todos os campos são obrigatórios: title, price, imageUrl');
    }

    const newProduct = {
        id: Date.now().toString(),
        title,
        price,
        imageUrl,
    };

    mockCards.push(newProduct);
    console.log(mockCards);
    res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, imageUrl } = req.body;
    const productIndex = mockCards.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).send('Produto não encontrado');
    }

    const updatedProduct = { id, title, price, imageUrl };
    mockCards[productIndex] = updatedProduct;

    console.log(mockCards);
    res.status(203).json(updatedProduct);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = mockCards.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).send('Produto não encontrado');
    }
    mockCards.splice(productIndex, 1);

    console.log(mockCards);
    res.status(204).send();
});

export default router;








// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     const product = mockCards.find(p => p.id === id);

//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).send('Produto não encontrado');
//     }
// });