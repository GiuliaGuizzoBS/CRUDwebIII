const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

// Rotas
const indexRoutes = require('./routes/indexRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const servicosRoutes = require('./routes/servicosRoutes');

// Models e DB
const { sequelize } = require('./models'); // carrega models e define associações automaticamente

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rotas
app.use('/', indexRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/servicos', servicosRoutes);

// Iniciar o servidor e sincronizar o banco de dados
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);

    sequelize.sync({ force: false })
        .then(() => {
            console.log('Banco de dados sincronizado.');
        })
        .catch((err) => {
            console.error('Erro ao sincronizar o banco de dados:', err);
        });
});
