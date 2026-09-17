const express = require("express");

const router = express.Router();

const produtoFornecedorController = require("../controller/produtoFornecedorController");

// Associar produto a fornecedor
router.post(
    "/produto-fornecedor",
    produtoFornecedorController.associar
);

// Desassociar produto de fornecedor
router.delete(
    "/produto-fornecedor",
    produtoFornecedorController.desassociar
);

// Consultar fornecedores de um produto
router.get(
    "/produtos/:produtoId/fornecedores",
    produtoFornecedorController.fornecedoresDoProduto
);

// Consultar produtos de um fornecedor
router.get(
    "/fornecedores/:fornecedorId/produtos",
    produtoFornecedorController.produtosDoFornecedor
);

module.exports = router;