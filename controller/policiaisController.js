const db = require('../db')

//exibir os dados da tabela policiais
exports.getAll = (req, res) => {
    const sql = 'select * from policiais'
    db.query(sql, (erro, resultado) => {
        if(erro) return res.status(500).json({erro: erro})
            res.json(resultado)
    })
}

//criar registros na tabela policiais
exports.create = (req, res) => {
    const {rg_civil, rg_militar, cpf, data_nascimento, matricula} = req.body;
    const sql = 'insert into policiais (nome, email) values (?, ?)'
    db.query(sql, [rg_civil, rg_militar, cpf, data_nascimento, matricula], (erro) => {
        if(erro) return res.status(500).json({erro: erro})
            res.status(201).json({ mensagem: 'Matrícula criada com sucesso!!' })
    })
}
 //atualizar registros da tabela policiais
 exports.update = (req, res) => {
    const {id} = req.params;
    const {rg_civil, rg_militar, cpf, data_nascimento, matricula} = req.body;
    const sql = 'update policiais set nome = ?, email = ? where id = ?'
    db.query(sql, [rg_civil, rg_militar, cpf, data_nascimento, matricula, id], (erro) => {
        if(erro) return res.status(500).json({erro: erro})
            res.json({ mensagem: 'Matrícula atualizada com sucesso!!' })
    })

 }

 // Excluir registros da tabela policiais
exports.delete = (req, res) => {
    const {id} = req.params;
    const sql = 'delete from policiais where id = ?'
    db.query(sql, [id], (erro) => {
        if(erro) return res.status(500).json({erro: erro})
            res.json({ mensagem: 'Matrícula excluída com sucesso!!' })
    })
}