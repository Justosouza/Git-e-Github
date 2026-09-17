const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const ProdutoFornecedor = sequelize.define("ProdutoFornecedor", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = ProdutoFornecedor;