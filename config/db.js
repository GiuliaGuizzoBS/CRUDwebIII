// config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Criação da instância do Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

// Testar conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conectado com sucesso ao banco de dados MySQL.');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

module.exports = sequelize;
