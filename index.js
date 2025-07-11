// index.js

const dotenv = require('dotenv');
// Carrega as variáveis de ambiente do arquivo .env antes de tudo
dotenv.config();

const express = require('express');
const syncController = require('./controllers/syncController');

const app = express();
const port = process.env.PORT || 3000;

// Define a rota e aponta para a função do controlador
app.get('/sync-produtos', syncController.syncProductsHandler);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Serviço de sincronização rodando em http://localhost:${port}`);
  console.log(`Endpoint: http://localhost:${port}/sync-produtos`);
});