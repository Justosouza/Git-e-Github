const Produto = require("../models/produto");

exports.criar = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);

        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

exports.listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll();

        res.json(produtos);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

exports.buscar = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        res.json(produto);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        await produto.update(req.body);

        res.json(produto);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

exports.deletar = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        await produto.destroy();

        res.json({
            mensagem: "Produto excluído com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};
exports.atualizarEstoque = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        const { quantidade, estoqueMinimo } = req.body;

        await produto.update({
            quantidade,
            estoqueMinimo
        });

        res.json({
            mensagem: "Estoque atualizado com sucesso",
            produto
        });

    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};
exports.estoqueBaixo = async (req, res) => {
    try {
        const produtos = await Produto.findAll();

        const produtosEstoqueBaixo = produtos.filter(produto =>
            produto.quantidade <= produto.estoqueMinimo
        );

        res.json(produtosEstoqueBaixo);

    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};