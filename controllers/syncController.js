// controllers/syncController.js

const syncService = require('../services/syncService');

async function syncProductsHandler(req, res) {
  try {
    // Agora o token é lido do cabeçalho da requisição
    const tinyToken = req.headers['x-tiny-token'];

    if (!tinyToken) {
      return res.status(401).json({ error: "O cabeçalho 'x-tiny-token' não foi fornecido." });
    }

    // Chama a função de serviço para executar a lógica
    const result = await syncService.syncProducts(tinyToken);

    return res.status(200).json({ status: "ok", ...result });

  } catch (e) {
    console.error("Erro no serviço de sincronização:", e);
    return res.status(500).json({ error: "Erro interno do servidor: " + e.message });
  }
}

module.exports = {
  syncProductsHandler
};