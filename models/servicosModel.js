const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./categoriaModel');  // Assumindo que a associação entre serviços e categorias já existe

const Servicos = sequelize.define('Servicos', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'servicos',  // Define o nome da tabela no banco de dados
    timestamps: true,  // Adiciona os campos createdAt e updatedAt automaticamente
});

// Definindo as associações
Servicos.belongsTo(Categoria, { foreignKey: 'categoria' });
Categoria.hasMany(Servicos, { foreignKey: 'categoria' });

module.exports = Servicos;