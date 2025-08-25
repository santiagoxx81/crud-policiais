### Cadastro e Gestão de Policiais Militares

Este projeto é uma API RESTful para cadastro e gestão de policiais militares, conforme os requisitos técnicos fornecidos. A aplicação permite realizar operações de CRUD (Create, Read, Update, Delete) com validações de dados e segurança, incluindo criptografia de informações sensíveis.

---

### Sumário

* [Requisitos](#requisitos)
* [Tecnologias](#tecnologias)
* [Instalação](#instalação)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Banco de Dados](#banco-de-dados)
* [Rotas da API](#rotas-da-api)
* [Front-end (Angular)](#front-end-angular)

---

### Requisitos

A aplicação foi desenvolvida para atender aos seguintes requisitos:

1.  **Banco de Dados (MySQL):** Armazenamento de dados essenciais dos policiais.
    * Tabela `policiais` com colunas para RG Civil, RG Militar, CPF, Data de Nascimento e Matrícula.
    * Campos como RG Civil, RG Militar e CPF são `UNIQUE` (únicos).
    * A Matrícula é armazenada de forma criptografada.
2.  **Backend (Node.js + Express):** Fornece um serviço RESTful para o CRUD.
    * **POST /policiais:** Cadastra um novo policial. Valida o CPF e criptografa a matrícula. Retorna status `201 Created` em caso de sucesso.
    * **GET /policiais:** Lista todos os policiais. Permite filtro opcional por RG ou CPF. A matrícula não é retornada por motivos de segurança, pois é um campo criptografado.

---

### Tecnologias

* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web para Node.js.
* **MySQL**: Banco de dados relacional.
* **`dotenv`**: Para gerenciar variáveis de ambiente.
* **`bcrypt`**: Biblioteca para criptografia de senhas e matrículas.
* **`cpf-cnpj-validator`**: Para validação do formato e cálculo de CPF.
* **`nodemon`**: Para restart automático do servidor em desenvolvimento.
* **Angular**: Framework front-end para a interface do usuário.

---

### Instalação

Siga os passos abaixo para instalar e rodar o projeto localmente:

1.  **Clone o repositório** e entre na pasta do projeto:
    `git clone <URL_DO_SEU_REPOSITORIO>`
    `cd <nome_do_seu_projeto>`

2.  **Instale as dependências** do back-end:
    `cd backend`
    `npm install`

3.  **Instale as dependências** do front-end:
    `cd ../frontend`
    `npm install`

4.  **Configure o banco de dados**:
    * Crie um arquivo `.env` dentro da pasta `backend/` com as credenciais do seu banco de dados.
    * Exemplo de conteúdo para o `.env`:
        ```
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=<SUA_SENHA_AQUI>
        DB_NAME=crud_policiais
        ```

5.  **Rode o script SQL** para criar a tabela `policiais`.
    * Execute o seguinte comando no seu cliente MySQL:
        `CREATE TABLE policiais ( ... );`
    * **Atenção:** Se a coluna `matricula` for `VARCHAR(50)`, lembre-se de alterá-la para `VARCHAR(255)` para suportar o hash do `bcrypt`. Para isso, rode o comando:
        `ALTER TABLE policiais MODIFY COLUMN matricula VARCHAR(255);`

6.  **Inicie o servidor**:
    `cd backend`
    `nodemon server.js`

7.  **Inicie o front-end**:
    `cd ../frontend`
    `ng serve`

---

### Estrutura do Projeto

A aplicação é dividida em back-end e front-end, seguindo o padrão de arquitetura modular.

* **`/` (raiz do projeto)**
    * `README.md`
    * `.gitignore`
* **`/backend`**
    * `db.js`: Contém a configuração de conexão com o banco de dados.
    * `policiaisController.js`: Lógica de negócio e validação, manipulando requisições HTTP e interagindo com o banco de dados.
    * `policiaisRoutes.js`: Define as rotas da API, direcionando as requisições para o `Controller` correto.
    * `server.js`: Arquivo principal que inicia o servidor Express e carrega as rotas.
* **`/frontend`**
    * **`src/app/`**: Contém os componentes Angular.
    * **`services/policiais.service.ts`**: Faz a comunicação com a API RESTful.
    * **`pages/cadastro/cadastro.component.ts`**: Componente de cadastro e listagem.

---

### Banco de Dados

O banco de dados `crud_policiais` e a tabela `policiais` são a base da aplicação. A matrícula é armazenada de forma criptografada para segurança.

### Rotas da API

As rotas podem ser testadas com ferramentas como Insomnia ou Postman. A URL base é `http://localhost:3012`.

* **`POST /policiais`**
    * **Descrição:** Cadastra um novo policial.
    * **Corpo da Requisição (JSON):**
        ```json
        {
          "rg_civil": "...",
          "rg_militar": "...",
          "cpf_input": "...",
          "data_nascimento": "YYYY-MM-DD",
          "matricula": "..."
        }
        ```
    * **Status de Resposta:** `201 Created` em caso de sucesso, `400 Bad Request` em caso de erro de validação (campos obrigatórios faltando, CPF inválido) ou `409 Conflict` se houver dados duplicados.

* **`GET /policiais`**
    * **Descrição:** Lista todos os policiais cadastrados (sem a matrícula).
    * **Exemplo de Resposta (JSON):**
        ```json
        [
          {
            "id": 1,
            "rg_civil": "...",
            "rg_militar": "...",
            "cpf": "...",
            "data_nascimento": "YYYY-MM-DD"
          }
        ]
        ```

* **`PUT /policiais/:id`**
    * **Descrição:** Atualiza um policial existente.
    * **Corpo da Requisição (JSON):**
        ```json
        {
          "rg_civil": "...",
          "rg_militar": "...",
          "cpf_input": "...",
          "data_nascimento": "YYYY-MM-DD"
        }
        ```
* **`DELETE /policiais/:id`**
    * **Descrição:** Exclui um policial existente.

---

### Front-end (Angular)

A interface do usuário é construída com Angular para interagir com a API.

* **`services/policiais.service.ts`:**
    * Contém os métodos para cada rota da API, como `cadastrarPolicial()` e `listarPoliciais()`.
    * Adapta a comunicação com o back-end, incluindo o tratamento de parâmetros de busca e a formatação de dados.

* **`pages/cadastro/cadastro.component.ts`:**
    * Lida com a lógica de exibição e interação com o formulário e a tabela.
    * Utiliza o `PoliciaisService` para executar as operações de CRUD.