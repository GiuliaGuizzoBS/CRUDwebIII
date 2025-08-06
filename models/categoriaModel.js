const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa a conexão do Sequelize

// Define o modelo 'Categoria' usando Sequelize
const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false, // Garante que o campo 'nome' não seja nulo
    }
}, {
    timestamps: false, // Desativa os campos 'createdAt' e 'updatedAt'
});

// CRUD utilizando Sequelize

const CategoriaController = {
    // Criar uma categoria
    create: async (categoria, callback) => {
        try {
            const novaCategoria = await Categoria.create({
                nome: categoria.nome,
            });
            callback(null, novaCategoria); // Retorna a categoria criada
        } catch (err) {
            callback(err); // Retorna o erro se houver
        }
    },

    // Encontrar categoria por ID
    findById: async (id, callback) => {
        try {
            const categoria = await Categoria.findByPk(id);
            if (!categoria) {
                return callback('Categoria não encontrada');
            }
            callback(null, categoria); // Retorna a categoria encontrada
        } catch (err) {
            callback(err); // Retorna o erro se houver
        }
    },

    // Encontrar categoria por nome
    findByName: async (nome, callback) => {
        try {
            const categoria = await Categoria.findOne({ where: { nome } });
            if (!categoria) {
                return callback('Categoria não encontrada');
            }
            callback(null, categoria); // Retorna a categoria encontrada
        } catch (err) {
            callback(err); // Retorna o erro se houver
        }
    },

    // Atualizar uma categoria
    update: async (id, categoria, callback) => {
        try {
            const [affectedRows] = await Categoria.update(
                { nome: categoria.nome },
                { where: { id } }
            );
            if (affectedRows === 0) {
                return callback('Categoria não encontrada');
            }
            callback(null, 'Categoria atualizada com sucesso');
        } catch (err) {
            callback(err); // Retorna o erro se houver
        }
    },

    // Deletar uma categoria
    delete: async (id, callback) => {
        try {
            const categoria = await Categoria.findByPk(id);
            if (!categoria) {
                return callback('Categoria não encontrada');
            }
            await categoria.destroy(); // Deleta a categoria
            callback(null, 'Categoria deletada com sucesso');
        } catch (err) {
            callback(err); // Retorna o erro se houver
        }
    },

    // Obter todas as categorias
    getAll: async (callback) => {
        try {
            const categorias = await Categoria.findAll();
            callback(null, categorias); // Retorna todas as categorias
        } catch (err) {
            callback(err); // Retorna o erro se houver
        }
    },
};

module.exports = CategoriaController;
