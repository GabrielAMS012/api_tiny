// services/syncService.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
async function fetchProdutosTiny(token, pagina) {
  const url = `https://api.tiny.com.br/api2/produtos.pesquisa.php?token=${token}&formato=json&pesquisa=`;
  const res = await fetch(url);
  const json = await res.json();

  if (json.retorno && json.retorno.produtos) {
    return json.retorno.produtos;
  } else {
    return [];
  }
}

async function syncProducts(tinyToken) {
  let pagina = 1;
  let todosProdutos = [];
  let continuar = true;

  const produtosPagina = await fetchProdutosTiny(tinyToken, pagina);

  for (const p of produtosPagina) {
    const produto = p.produto;
    const codigoTiny = produto.id; 

    const { data: existente } = await supabase
      .from("product") 
      .select("*")
      .eq("id_tiny_produto", codigoTiny) 
      .maybeSingle();

    const dadosParaInserirOuAtualizar = {
      id_tiny_produto: codigoTiny, 
      name: produto.nome,          
      valor: Number(produto.preco || 0), 
    };

    if (existente) {
      if (
        existente.name !== dadosParaInserirOuAtualizar.name ||
        existente.valor !== dadosParaInserirOuAtualizar.valor
      ) {
        await supabase
          .from("product") 
          .update(dadosParaInserirOuAtualizar)
          .eq("id_tiny_produto", codigoTiny); 
      }
    } else {
      await supabase.from("product").insert(dadosParaInserirOuAtualizar); 
    }
  }

  return { total: todosProdutos.length };
}

module.exports = {
  syncProducts
};