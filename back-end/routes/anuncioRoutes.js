const express = require("express");
const router = express.Router();


const Anuncio = require("../models/anuncio");
const AnuncioController = require("../controller/anuncioController");


//Criar anuncio
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
        if (err) return res.status(500).send("Erro ao criar anúncio!");
        res.json({ sucesso: true, id: result.insertId });
    });
});


//Listar anuncio 
    router.get("/", (req, res) => {
        AnuncioController.listar((err, anuncios) => {
        if (err) return res.status(500).send("Erro ao buscar anúncio!");
        res.json(anuncios);
    });
});


//Deletar anuncio
router.delete("/deletar/:id", (req, res) => {
    const id = req.params.id;

AnuncioController.deletar(id, (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ erro: "Anúncio não encontrado" });
        res.json({ sucesso: true });

    });
});

//Editar anuncio

router.get("/:id", (req, res) => {
  const id = req.params.id;

  AnuncioController.buscarPorId(id, (err, anuncio) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!anuncio) return res.status(404).json({ erro: "Anúncio não encontrado" });

    res.json(anuncio);
  });
});

router.put("/editar/:id", (req, res) => {
    const id = req.params.id;

    const {
        imagens,
        nome,
        localizacao,
        estrelas,
        descricao_rapida,
        descricao_detalhada,
        valor,
        localizacao_link

    } = req.body;

    const anuncio = new Anuncio(
        id,
        imagens,
        nome,
        localizacao,
        estrelas,
        descricao_rapida,
        descricao_detalhada,
        valor,
        localizacao_link

    );

    AnuncioController.editar(id, anuncio, (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ sucesso: true });
    });
});


module.exports = router;