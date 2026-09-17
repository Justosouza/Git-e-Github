const Produto = require("../models/produto");
const Fornecedor = require("../models/fornecedor");
const ProdutoFornecedor = require("../models/produtofornecedor");

// Associar produto a fornecedor
exports.associar = async (req, res) => {
    try {
        const { produtoId, fornecedorId } = req.body;

        const produto = await Produto.findByPk(produtoId);
        const fornecedor = await Fornecedor.findByPk(fornecedorId);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        if (!fornecedor) {
            return res.status(404).json({
                mensagem: "Fornecedor não encontrado"
            });
        }

        await produto.addFornecedor(fornecedor);

        res.status(201).json({
            mensagem: "Produto associado ao fornecedor com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

// Desassociar produto de fornecedor
exports.desassociar = async (req, res) => {
    try {
        const { produtoId, fornecedorId } = req.body;

        const produto = await Produto.findByPk(produtoId);
        const fornecedor = await Fornecedor.findByPk(fornecedorId);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        if (!fornecedor) {
            return res.status(404).json({
                mensagem: "Fornecedor não encontrado"
            });
        }

        await produto.removeFornecedor(fornecedor);

        res.json({
            mensagem: "Produto desassociado do fornecedor com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

// Consultar fornecedores de um produto
exports.fornecedoresDoProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.produtoId, {
            include: Fornecedor
        });

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        res.json(produto.Fornecedors);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

// Consultar produtos de um fornecedor
exports.produtosDoFornecedor = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByPk(req.params.fornecedorId, {
            include: Produto
        });

        if (!fornecedor) {
            return res.status(404).json({
                mensagem: "Fornecedor não encontrado"
            });
        }

        res.json(fornecedor.Produtos);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};