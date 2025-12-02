const express = require("express");
const router = express.Router();
const proteger = require("../middleware/auth");

const Anuncio = require("../models/anuncio");
const AnuncioController = require("../controller/anuncioController");
const AuthController = require("../controller/authController");

// LOGIN
router.post("/login", AuthController.login);

// Criar anúncio
router.post("/criar-anuncio", proteger, (req, res) => {
    const {
        imagens,
        nome_do_anuncio,
        localizacao,
        estrelas,
        descricao_rapida,
        descricao_detalhada,
        valor,
        localizacao_link
    } = req.body;

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

// Listar
router.get("/", (req, res) => {
    AnuncioController.listar((err, anuncios) => {
        if (err) return res.status(500).send("Erro ao buscar anúncios!");
        res.json(anuncios);
    });
});

// Buscar por ID Publico
router.get("/publico/:id", (req, res) => {
    const id = req.params.id;

    AnuncioController.buscarPorId(id, (err, anuncio) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!anuncio) return res.status(404).json({ erro: "Anúncio não encontrado" });

        res.json(anuncio);
    });
});


// Buscar por ID Privado
router.get("/:id", proteger, (req, res) => {
    const id = req.params.id;

    AnuncioController.buscarPorId(id, (err, anuncio) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!anuncio) return res.status(404).json({ erro: "Anúncio não encontrado" });

        res.json(anuncio);
    });
});

// Editar
router.put("/editar/:id", proteger, (req, res) => {
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

    const anuncio = {
        imagens,
        nome,
        localizacao,
        estrelas,
        descricao_rapida,
        descricao_detalhada,
        valor,
        localizacao_link
    };

    AnuncioController.editar(id, anuncio, (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ sucesso: true });
    });
});

// Deletar
router.delete("/deletar/:id", proteger, (req, res) => {
    const id = req.params.id;

    AnuncioController.deletar(id, (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ erro: "Anúncio não encontrado" });
        res.json({ sucesso: true });
    });
});

module.exports = router;
