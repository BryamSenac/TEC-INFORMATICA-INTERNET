import express from 'express';
import cors from 'cors';

import mainRoutes from './src/routes/initial.js';
import productRoutes from './src/routes/products.js';

const app = express();
app.use(express.json());
app.use(cors());


app.use('/', mainRoutes);
app.use('/products', productRoutes);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta ${3000}`);
});