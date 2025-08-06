// models/index.js
const sequelize = require('../config/db');
const Produto = require('./produtoModel');
const Categoria = require('./categoriaModel');
const Servicos = require('./servicosModel');

// Definir as associações
Produto.associate && Produto.associate({ Categoria });
Categoria.associate && Categoria.associate({ Produto, Servicos });
Servicos.associate && Servicos.associate({ Categoria });

module.exports = {
  sequelize,
  Produto,
  Categoria,
  Servicos
};
