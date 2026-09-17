const express = require("express");
const cors = require("cors");
const sequelize = require("./database/database");

const produtoroutes = require("./routes/produtoroutes");
const fornecedorroutes = require("./routes/fornecedorroutes");
const produtoFornecedorroutes = require("./routes/produtoFornecedorroutes");

require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.use(produtoroutes);
app.use(fornecedorroutes);
app.use(produtoFornecedorroutes);

sequelize.sync()
    .then(() => {
        console.log("Banco de dados conectado!");

        app.listen(3000, () => {
            console.log("Servidor rodando em http://localhost:3000");
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco:", error);
    });