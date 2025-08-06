const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categorias', // Refere-se à tabela de categorias
            key: 'id'
        }
    }
}, {
    timestamps: false, // Desativa os campos 'createdAt' e 'updatedAt'
});

// Associa o produto com a categoria
Produto.associate = (models) => {
    Produto.belongsTo(models.Categoria, {
        foreignKey: 'categoria',
        as: 'categoriaProduto',
    });
};

module.exports = Produto;
