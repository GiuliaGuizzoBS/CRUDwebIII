const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const usuarioRoutes = require('./routes/userRoutes'); // Renomeado aqui
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const servicosRoutes = require('./routes/servicosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // se estiver usando layouts

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rotas
app.use('/', indexRoutes);
app.use('/usuarios', usuarioRoutes); // Aqui mudou de /users para /usuarios
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/servicos', servicosRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
