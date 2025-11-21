const express = require("express");
const router = express.Router();

const Anuncio = require("../models/anuncio");
const AnuncioController = require("../controller/anuncioController");

router.post("/criar-anuncio", (req, res) => {
    const { imagens, nome_do_anuncio, localizacao, estrelas, descricao_rapida, descricao_detalhada, valor, localizacao_link } = req.body;

    const anuncio = new Anuncio(
        null,
        imagens,
        nome_do_anuncio,
        localizacao,
        estrelas,
        descricao_rapida,
        descricao_detalhada,
        valor,
        localizacao_link
    );

    AnuncioController.criar(anuncio, (err, result) => {
        if (err) return res.status(500).send("Erro ao criar anúncio");
        res.redirect("/home/index.html");
    });
});

router.delete("/deletar-anuncio/:id", (req, res) => {
    const id = req.params.id;

    AnuncioController.deletar(id, (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ sucesso: true });
    });
});

router.get("/api/anuncios", (req, res) => {
    AnuncioController.listar((err, anuncios) => {
        if (err) return res.status(500).json(err);
        res.json(anuncios);
    });
});

module.exports = router;