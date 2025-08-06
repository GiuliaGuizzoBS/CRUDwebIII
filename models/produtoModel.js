const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definição do modelo Produto
const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'produtos',
  timestamps: false,
});

// Associações (chamadas externamente, via models/index.js)
Produto.associate = (models) => {
  Produto.belongsTo(models.Categoria, {
    foreignKey: 'categoria',
    as: 'categoriaProduto',
  });
};

module.exports = Produto;
