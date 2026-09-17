const express = require("express");

const router = express.Router();

const produtocontroller = require("../controller/produtoController");

router.post("/produtos", produtocontroller.criar);

router.get("/produtos", produtocontroller.listar);

router.get("/produtos/:id", produtocontroller.buscar);

router.put("/produtos/:id", produtocontroller.atualizar);

router.delete("/produtos/:id", produtocontroller.deletar);

module.exports = router;