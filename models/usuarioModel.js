const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Conexão com o banco

const Usuario = sequelize.define('Usuario', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'usuarios',
    timestamps: false, // Caso sua tabela não tenha timestamps como createdAt e updatedAt
});

module.exports = Usuario;
