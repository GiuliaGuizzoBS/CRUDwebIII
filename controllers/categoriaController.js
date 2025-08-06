const Categoria = require('../models/categoriaModel');

const categoriaController = {
  // Exibe o formulário para criar uma nova categoria
  renderCreateForm: (req, res) => {
    res.render('categorias/create');
  },

  // Cria uma nova categoria
  createCategoria: async (req, res) => {
    const { nome } = req.body;

    try {
      await Categoria.create({ nome });
      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lista todas as categorias
  getAllCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.render('categorias/index', { categorias });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Exibe uma única categoria por ID
  getCategoriaById: async (req, res) => {
    const { id } = req.params;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });

      res.render('categorias/show', { categoria });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Exibe o formulário de edição de uma categoria
  renderEditForm: async (req, res) => {
    const { id } = req.params;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });

      res.render('categorias/edit', { categoria });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza uma categoria existente
  updateCategoria: async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const [updated] = await Categoria.update({ nome }, { where: { id } });
      if (updated === 0) return res.status(404).json({ message: 'Categoria não encontrada' });

      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta uma categoria
  deleteCategoria: async (req, res) => {
    const { id } = req.params;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });

      await categoria.destroy();
      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = categoriaController;
