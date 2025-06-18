const db = require('../config/db');

const Servicos = {
    create: (servicos, callback) => {
        const query = 'INSERT INTO servicos (nome, descricao, preco, quantidade, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [servicos.nome, servicos.descricao, servicos.preco, servicos.quantidade, servicos.categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT servicos.*, categorias.nome AS categoria_nome FROM servicos JOIN categorias ON servicos.categoria = categorias.id WHERE servicos.id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, servicos, callback) => {
        const query = 'UPDATE servicos SET nome = ?, preco = ?, descricao = ?, quantidade = ?, categoria = ? WHERE id = ?';
        db.query(query, [servicos.nome, servicos.preco, servicos.descricao, servicos.quantidade, servicos.categoria, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM servicos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (categoria, callback) => {
        let query = 'SELECT servicos.id, servicos.nome, servicos.descricao, servicos.preco, servicos.quantidade, categorias.nome AS categoria_nome FROM servicos JOIN categorias ON servicos.categoria = categorias.id';
        
        if (categoria) {
            query += ' WHERE servicos.categoria = ?';
        }
    
        db.query(query, [categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    
};

module.exports = Servicos;