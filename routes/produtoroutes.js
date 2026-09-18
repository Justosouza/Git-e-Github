const express = require("express");

const router = express.Router();

const produtocontroller = require("../controller/produtoController");

router.post("/produtos", produtocontroller.criar);

router.get("/produtos", produtocontroller.listar);

// Novo endpoint - atualizar estoque
router.patch("/produtos/:id/estoque", produtocontroller.atualizarEstoque);
// Novo endpoint - consultar produtos com estoque baixo
router.get("/produtos/estoque-baixo", produtocontroller.estoqueBaixo);

router.get("/produtos/:id", produtocontroller.buscar);

router.put("/produtos/:id", produtocontroller.atualizar);

router.delete("/produtos/:id", produtocontroller.deletar);

module.exports = router;