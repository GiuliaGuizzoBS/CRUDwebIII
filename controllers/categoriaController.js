const Categoria = require('../models/Categoria'); // Importando o modelo com Sequelize

const categoriaController = {
    // Criar uma nova categoria
    createCategoria: async (req, res) => {
        const { nome } = req.body; // Extrai o nome do corpo da requisição

        try {
            // Cria a nova categoria
            const novaCategoria = await Categoria.create({ nome });

            // Redireciona para a lista de categorias
            res.redirect('/categorias');
        } catch (err) {
            // Se ocorrer um erro, envia uma resposta de erro
            return res.status(500).json({ error: err.message });
        }
    },

    // Encontrar uma categoria por ID
    getCategoriaById: async (req, res) => {
        const categoriaId = req.params.id; // Obtém o id da categoria da URL

        try {
            // Busca a categoria pelo ID
            const categoria = await Categoria.findByPk(categoriaId);

            // Se a categoria não for encontrada, retorna erro 404
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            // Renderiza a página para mostrar a categoria
            res.render('categorias/show', { categoria });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Obter todas as categorias
    getAllCategorias: async (req, res) => {
        try {
            // Busca todas as categorias
            const categorias = await Categoria.findAll();

            // Renderiza a página com a lista de categorias
            res.render('categorias/index', { categorias });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Renderizar formulário de criação de categoria
    renderCreateForm: (req, res) => {
        res.render('categorias/create'); // Renderiza o formulário de criação
    },

    // Renderizar formulário de edição de categoria
    renderEditForm: async (req, res) => {
        const categoriaId = req.params.id;

        try {
            // Busca a categoria pelo ID
            const categoria = await Categoria.findByPk(categoriaId);

            // Se não encontrar, retorna erro 404
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            // Renderiza a página de edição
            res.render('categorias/edit', { categoria });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Atualizar uma categoria
    updateCategoria: async (req, res) => {
        const categoriaId = req.params.id;
        const { nome } = req.body; // Extrai o novo nome

        try {
            // Tenta atualizar a categoria
            const [affectedRows] = await Categoria.update(
                { nome },
                { where: { id: categoriaId } }
            );

            // Se não encontrar a categoria, retorna erro 404
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            // Redireciona para a lista de categorias
            res.redirect('/categorias');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Deletar uma categoria
    deleteCategoria: async (req, res) => {
        const categoriaId = req.params.id;

        try {
            // Tenta encontrar a categoria
            const categoria = await Categoria.findByPk(categoriaId);

            // Se não encontrar, retorna erro 404
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            // Deleta a categoria
            await categoria.destroy();

            // Redireciona para a lista de categorias
            res.redirect('/categorias');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};

module.exports = categoriaController;