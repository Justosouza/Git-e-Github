const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Fornecedor = sequelize.define("Fornecedor", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    },

    endereco: {
        type: DataTypes.STRING
    },

    contato: {
        type: DataTypes.STRING
    }
});

module.exports = Fornecedor;