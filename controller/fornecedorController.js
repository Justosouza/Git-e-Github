const Fornecedor = require("../models/fornecedor");

exports.criar = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.create(req.body);

        res.status(201).json(fornecedor);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

exports.listar = async (req, res) => {
    try {
        const fornecedores = await Fornecedor.findAll();

        res.json(fornecedores);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

exports.buscar = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByPk(req.params.id);

        if (!fornecedor) {
            return res.status(404).json({
                mensagem: "Fornecedor não encontrado"
            });
        }

        res.json(fornecedor);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByPk(req.params.id);

        if (!fornecedor) {
            return res.status(404).json({
                mensagem: "Fornecedor não encontrado"
            });
        }

        await fornecedor.update(req.body);

        res.json(fornecedor);
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

exports.deletar = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByPk(req.params.id);

        if (!fornecedor) {
            return res.status(404).json({
                mensagem: "Fornecedor não encontrado"
            });
        }

        await fornecedor.destroy();

        res.json({
            mensagem: "Fornecedor excluído com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};