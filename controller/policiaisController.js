const db = require('../db');
const { cpf } = require('cpf-cnpj-validator');
const bcrypt = require('bcrypt');

// Listar todos os policiais com filtro opcional por CPF ou RG
exports.getAll = (req, res) => {
    const { cpf_input, rg_input } = req.query; // Pega o CPF e RG da URL
    let sql = 'select id, rg_civil, rg_militar, cpf, data_nascimento from policiais';
    const params = [];

    // Lógica para adicionar filtros
    if (cpf_input) {
        sql += ' where cpf = ?';
        params.push(cpf_input);
    } else if (rg_input) {
        sql += ' where rg_civil = ? or rg_militar = ?';
        params.push(rg_input, rg_input);
    }

    db.query(sql, params, (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar policiais.' });
        res.json(resultado);
    });
};

// Criar registros na tabela de policiais
exports.create = async (req, res) => {
    const { rg_civil, rg_militar, cpf_input, data_nascimento, matricula } = req.body;

    // Converte a data de nascimento para o formato YYYY-MM-DD
    const dataNascimentoFormatada = new Date(data_nascimento).toISOString().slice(0, 10);

    // Validação de campos obrigatórios
    if (!rg_civil || !rg_militar || !cpf_input || !data_nascimento || !matricula) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    // Validação de CPF
    if (!cpf.isValid(cpf_input)) {
        return res.status(400).json({ erro: 'CPF inválido.' });
    }

    // Criptografia da matrícula
    try {
        const saltRounds = 10;
        const matriculaHash = await bcrypt.hash(matricula, saltRounds);

        const sql = 'insert into policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) values (?, ?, ?, ?, ?)';
        db.query(sql, [rg_civil, rg_militar, cpf_input, dataNascimentoFormatada, matriculaHash], (erro) => {
            if (erro) {
                console.log(erro);
                return res.status(500).json({ erro: 'Erro ao criar policial. Verifique os dados e tente novamente.' });
            }
            res.status(201).json({ mensagem: 'Policial cadastrado com sucesso.' });
        });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ erro: 'Erro na criptografia da matrícula.' });
    }
};

// Atualizar registros na tabela de policiais
exports.update = async (req, res) => {
    const { id } = req.params;
    const { rg_civil, rg_militar, cpf_input, data_nascimento, matricula } = req.body;

    // Validação de campos obrigatórios
    if (!rg_civil || !rg_militar || !cpf_input || !data_nascimento || !matricula) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    // Validação de CPF
    if (!cpf.isValid(cpf_input)) {
        return res.status(400).json({ erro: 'CPF inválido.' });
    }

    try {
        const saltRounds = 10;
        const matriculaHash = await bcrypt.hash(matricula, saltRounds);

        const sql = 'update policiais set rg_civil = ?, rg_militar = ?, cpf = ?, data_nascimento = ?, matricula = ? where id = ?';
        db.query(sql, [rg_civil, rg_militar, cpf_input, data_nascimento, matriculaHash, id], (erro) => {
            if (erro) return res.status(500).json({ erro: 'Erro ao atualizar policial.' });
            res.json({ mensagem: 'Policial atualizado com sucesso.' });
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro na criptografia da matrícula.' });
    }
};

// Excluir registros na tabela de policiais
exports.delete = (req, res) => {
    const { id } = req.params;
    const sql = 'delete from policiais where id = ?';
    db.query(sql, [id], (erro) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao excluir policial.' });
        res.json({ mensagem: 'Policial excluído com sucesso.' });
    });
};