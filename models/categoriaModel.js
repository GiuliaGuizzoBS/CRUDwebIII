const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'categorias',
  timestamps: false,
});

// Relacionamentos (opcional se usado com index.js)
Categoria.associate = (models) => {
  Categoria.hasMany(models.Produto, {
    foreignKey: 'categoria',
    as: 'produtosCategoria',
  });

  Categoria.hasMany(models.Servicos, {
    foreignKey: 'categoria',
    as: 'servicosCategoria',
  });
};

module.exports = Categoria;
