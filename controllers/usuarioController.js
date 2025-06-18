const Usuario = require('../models/usuarioModel');

const usuarioController = {
    createUsuario: (req, res) => {
        const newUsuario = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };

        Usuario.create(newUsuario, (err, usuarioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    getUsuarioById: (req, res) => {
        const usuarioId = req.params.id;

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/show', { usuario });
        });
    },

    getAllUsuarios: (req, res) => {
        Usuario.getAll((err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('usuarios/index', { usuarios });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    renderEditForm: (req, res) => {
        const usuarioId = req.params.id;

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/edit', { usuario });
        });
    },

    updateUsuario: (req, res) => {
        const usuarioId = req.params.id;
        const updatedUsuario = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };

        Usuario.update(usuarioId, updatedUsuario, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    deleteUsuario: (req, res) => {
        const usuarioId = req.params.id;

        Usuario.delete(usuarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    searchUsuarios: (req, res) => {
        const search = req.query.search || '';

        Usuario.searchByName(search, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ usuarios });
        });
    },
};

module.exports = usuarioController;
