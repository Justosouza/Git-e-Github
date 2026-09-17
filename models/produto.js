const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Produto = sequelize.define("Produto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.STRING
    },

    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    codigoBarras: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Produto;

module.exports = Produto;