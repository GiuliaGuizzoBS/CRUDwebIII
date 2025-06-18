const Servicos = require('../models/servicosModel');
const Categoria = require('../models/categoriaModel');

const servicosController = {

    createServicos: (req, res) => {

        const newServicos = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Servicos.create(newServicos, (err, servicosId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/servicos');
        });
    },

    getServicosById: (req, res) => {
        const servicosId = req.params.id;

        Servicos.findById(servicosId, (err, servicos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!servicos) {
                return res.status(404).json({ message: 'Serviço not found' });
            }
            res.render('servicos/show', { servicos });
        });
    },
    
    getAllServicos: (req, res) => {
        const categoria = req.query.categoria || null;
        
        Servicos.getAll(categoria, (err, servicos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('servicos/index', { servicos, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('servicos/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const servicosId = req.params.id;

        Servicos.findById(servicosId, (err, servicos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!servicos) {
                return res.status(404).json({ message: 'Servico not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('servicos/edit', { servicos, categorias });
            });
        });
    },

    updateServicos: (req, res) => {
        const servicosId = req.params.id;
        
        const updatedServicos = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Servicos.update(servicosId, updatedServicos, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/servicos');
        });
    },

    deleteServicos: (req, res) => {
        const servicosId = req.params.id;

        Servicos.delete(servicosId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/servicos');
        });
    }
};

module.exports = servicosController;