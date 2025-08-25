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

---

### Requisitos

A aplicação foi desenvolvida para atender aos seguintes requisitos:

1.  **Banco de Dados (MySQL):** Armazenamento de dados essenciais dos policiais.
    * Tabela `policiais` com colunas para RG Civil, RG Militar, CPF, Data de Nascimento e Matrícula.
    * Campos como RG Civil, RG Militar e CPF são `UNIQUE` (únicos).
    * A Matrícula é armazenada de forma criptografada.
2.  **Backend (Node.js + Express)::** Fornece um serviço RESTful para o CRUD.
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

---

### Instalação

Siga os passos abaixo para instalar e rodar o projeto localmente:

1.  **Clone o repositório** e entre na pasta do projeto:
    `git clone <URL_DO_SEU_REPOSITORIO>`
    `cd <nome_do_seu_projeto>`

2.  **Instale as dependências** do projeto:
    `npm install`

3.  **Configure o banco de dados**:
    * Crie um arquivo `.env` na raiz do projeto com as credenciais do seu banco de dados.
    * Exemplo de conteúdo para o `.env`:
        ```
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=<SUA_SENHA_AQUI>
        DB_NAME=crud_policiais
        ```

4.  **Rode o script SQL** para criar a tabela `policiais`. O script `banco.sql` está disponível no projeto.
    * Execute o seguinte comando no seu cliente MySQL:
        `CREATE TABLE policiais ( ... );`
    * **Atenção:** Se a coluna `matricula` for `VARCHAR(50)`, lembre-se de alterá-la para `VARCHAR(255)` para suportar o hash do `bcrypt`, pois senão irá gerar um erro de "data too long". Para fazer isso, rode o comando:
        `ALTER TABLE policiais MODIFY COLUMN matricula VARCHAR(255);`

5.  **Inicie o servidor**:
    `npm start` ou `nodemon server.js`

---

### Estrutura do Projeto

A aplicação segue o padrão de arquitetura MVC (Model-View-Controller) com a seguinte organização:

* **`db.js`**: Contém a configuração de conexão com o banco de dados.
* **`policiaisController.js`**: Lógica de negócio e validação, manipulando requisições HTTP e interagindo com o banco de dados.
* **`policiaisRoutes.js`**: Define as rotas da API, direcionando as requisições para o `Controller` correto.
* **`server.js`**: Arquivo principal que inicia o servidor Express e carrega as rotas.

---

### Rotas da API

As rotas podem ser testadas com ferramentas como Insomnia ou Postman.

* **`POST /policiais`**
    * **Descrição:** Cadastra um novo policial.
    * **Corpo da Requisição (JSON):**
        ```json
        {
          "rg_civil": "...",
          "rg_militar": "...",
          "cpf": "...",
          "data_nascimento": "YYYY-MM-DD",
          "matricula": "..."
        }
        ```
    * **Status de Resposta:** `201 Created` em caso de sucesso ou `400 Bad Request` em caso de erro de validação (CPF inválido, campos faltando, etc.).

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

* **`GET /policiais?cpf=<valor>`**
    * **Descrição:** Busca um policial pelo CPF.

* **`GET /policiais?rg_civil=<valor>`**
    * **Descrição:** Busca um policial pelo RG Civil.
Agora vai?