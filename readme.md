### API de Sincronização Tiny ERP para Supabase

Esta é uma API em Node.js que sincroniza produtos do Tiny ERP para um banco de dados Supabase.

-----

### Configuração

1.  **Instale as dependências** do projeto com o comando:
    ```bash
    npm install
    ```
2.  **Crie um arquivo `.env`** na pasta principal do projeto. Preencha-o com as suas chaves de API:
    ```dotenv
    # URL do seu projeto Supabase
    SUPABASE_URL="https://[seu-projeto-id].supabase.co"

    # Chave de Serviço do Supabase
    SUPABASE_KEY="[sua-chave-de-servico-aqui]"

    # Porta que o servidor irá rodar
    PORT=3000
    ```

-----

### Como Usar

1.  **Inicie o servidor** com o comando:
    ```bash
    npm start
    ```
2.  **Chame o endpoint** `GET /sync-produtos` para disparar a sincronização. Você deve passar o seu token do Tiny ERP no cabeçalho `x-tiny-token`.

#### Exemplo de requisição (com `curl`):

```bash
curl -X GET http://localhost:3000/sync-produtos -H "x-tiny-token: [seu-token-tiny-aqui]"
```