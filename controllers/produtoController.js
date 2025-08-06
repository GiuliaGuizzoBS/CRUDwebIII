const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

const produtoController = {
    // Criar um novo produto
    createProduto: async (req, res) => {
        const { nome, descricao, preco, quantidade, categoria } = req.body;

        try {
            // Cria o produto no banco
            await Produto.create({ nome, descricao, preco, quantidade, categoria });
            res.redirect('/produtos');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Obter um produto por ID
    getProdutoById: async (req, res) => {
        const produtoId = req.params.id;

        try {
            const produto = await Produto.findByPk(produtoId, {
                include: {
                    model: Categoria,
                    as: 'categoriaProduto',
                    attributes: ['nome'] // Inclui apenas o nome da categoria
                }
            });

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.render('produtos/show', { produto });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Obter todos os produtos com filtro opcional de categoria
    getAllProdutos: async (req, res) => {
        const categoria = req.query.categoria || null;

        try {
            const produtos = await Produto.findAll({
                where: categoria ? { categoria } : {},
                include: {
                    model: Categoria,
                    as: 'categoriaProduto',
                    attributes: ['nome']
                }
            });

            // Obter todas as categorias para o filtro
            const categorias = await Categoria.findAll();

            res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoria });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Renderizar o formulário de criação
    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('produtos/create', { categorias });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Renderizar o formulário de edição
    renderEditForm: async (req, res) => {
        const produtoId = req.params.id;

        try {
            const produto = await Produto.findByPk(produtoId, {
                include: {
                    model: Categoria,
                    as: 'categoriaProduto',
                    attributes: ['nome']
                }
            });

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            const categorias = await Categoria.findAll();
            res.render('produtos/edit', { produto, categorias });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Atualizar um produto
    updateProduto: async (req, res) => {
        const produtoId = req.params.id;
        const { nome, descricao, preco, quantidade, categoria } = req.body;

        try {
            const [affectedRows] = await Produto.update(
                { nome, descricao, preco, quantidade, categoria },
                { where: { id: produtoId } }
            );

            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.redirect('/produtos');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    // Deletar um produto
    deleteProduto: async (req, res) => {
        const produtoId = req.params.id;

        try {
            const produto = await Produto.findByPk(produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            await produto.destroy();
            res.redirect('/produtos');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtoController;
