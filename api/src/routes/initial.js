import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo à API</title>
        <style>
            body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: #f0f2f5;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
            }
            .container {
                text-align: center;
                background-color: #ffffff;
                padding: 40px 50px;
                border-radius: 12px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                border: 1px solid #e0e0e0;
            }
            h1 {
                font-size: 2.5em;
                color: #1a73e8;
                margin-top: 0;
                margin-bottom: 10px;
            }
            p {
                font-size: 1.1em;
                color: #5f6368;
                margin-bottom: 25px;
            }
            code {
                background-color: #e8eaed;
                padding: 4px 8px;
                border-radius: 4px;
                font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
                color: #3c4043;
            }
            .footer {
                margin-top: 30px;
                font-size: 0.9em;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bem-vindo à API!</h1>
            <p>
                O serviço está no ar, mas parece que você não especificou um endpoint na URL.
            </p>
            <p>
                Tente acessar um recurso como <code>/products</code> ou <code>/users</code>.
            </p>
            <div class="footer">
                API em execução.
            </div>
        </div>
    </body>
    </html>
    `;

    res.send(htmlResponse);
});

export default router;