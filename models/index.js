const Produto = require("./produto");
const Fornecedor = require("./fornecedor");
const ProdutoFornecedor = require("./produtofornecedor");

Produto.belongsToMany(Fornecedor, {
    through: ProdutoFornecedor
});

Fornecedor.belongsToMany(Produto, {
    through: ProdutoFornecedor
});

module.exports = {
    Produto,
    Fornecedor,
    ProdutoFornecedor
};