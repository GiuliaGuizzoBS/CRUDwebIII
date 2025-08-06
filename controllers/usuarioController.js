const Usuario = require('../models/usuarioModel');

const usuarioController = {
    createUsuario: async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const newUsuario = await Usuario.create({ username, password, role });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getUsuarioById: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/show', { usuario });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.render('usuarios/index', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/edit', { usuario });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateUsuario: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            const { username, password, role } = req.body;
            const updatedUsuario = await Usuario.update(
                { username, password, role },
                { where: { id: usuarioId } }
            );
            if (updatedUsuario[0] === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            const deleted = await Usuario.destroy({ where: { id: usuarioId } });
            if (!deleted) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchUsuarios: async (req, res) => {
        try {
            const search = req.query.search || '';
            const usuarios = await Usuario.findAll({
                where: {
                    username: {
                        [Sequelize.Op.like]: `%${search}%`
                    }
                }
            });
            res.json({ usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = usuarioController;
