const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Configuração do Sequelize
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect: 'mysql',  // Use 'mysql' ou 'postgres', dependendo do seu banco
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,  // Desativa os logs SQL, pode ser removido ou ajustado
});

// Testando a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conectado com sucesso ao banco de dados MySQL.');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

module.exports = sequelize;