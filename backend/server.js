const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuarioRoutes = require('./routes/policiaisRoutes');

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/policiais', usuarioRoutes);


const PORT = process.env.APP_PORT || 3012;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));