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
            model: 'Categorias', // Refere-se à tabela de categorias (nome da tabela é 'categorias' por padrão)
            key: 'id'
        }
    }
}, {
    timestamps: false, // Desativa os campos 'createdAt' e 'updatedAt'
    tableName: 'produtos',  // Garantir que o nome da tabela seja 'produtos' no banco de dados
});

// Associa o produto com a categoria
Produto.associate = (models) => {
    Produto.belongsTo(models.Categoria, {
        foreignKey: 'categoria', // chave estrangeira
        as: 'categoriaProduto',  // alias para a relação
    });
};

module.exports = Produto;
