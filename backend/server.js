// * Dependências
// Carrega o módulo Express para criar a aplicação web.
const express = require('express');
// Carrega o módulo CORS para lidar com requisições de origens diferentes.
const cors = require('cors');
// Carrega as variáveis de ambiente do arquivo .env.
require('dotenv').config();

// * Módulos Locais
// Importa as rotas da API para policiais.
const usuarioRoutes = require('./routes/policiaisRoutes');

// * Configuração do Servidor
// Inicializa a aplicação Express.
const app = express();
// Habilita o middleware para lidar com requisições JSON.
app.use(express.json());

// * Configuração do CORS
// Configura o middleware CORS para permitir requisições de qualquer origem.
// Define os métodos HTTP e os cabeçalhos permitidos.
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// * Rotas da Aplicação
// Define o ponto de entrada principal para as rotas de policiais.
// Todas as rotas definidas em 'policiaisRoutes.js' serão acessadas via '/policiais'.
app.use('/policiais', usuarioRoutes);

// * Inicialização do Servidor
// Define a porta do servidor, usando a variável de ambiente APP_PORT ou a porta 3012 como padrão.
const PORT = process.env.APP_PORT || 3012;
// Inicia o servidor e exibe uma mensagem no console.
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));