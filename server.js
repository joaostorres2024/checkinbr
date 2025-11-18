const express = require("express");
const path = require("path");
const app = express();

// Server frontend
app.use(express.static(path.join(__dirname, "front-end")));

// Rota padrão
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front-end", "home", "index.html"));
});

const db = require("./back-end/db");

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post("/criar-anuncio", (req, res) => {
    const { imagens, nome_do_anuncio, localizacao, estrelas, descricao_rapida, descricao_detalhada, valor, localizacao_link} = req.body;

    const sql = "INSERT INTO anuncios (imagens, nome_do_anuncio, localizacao, estrelas, descricao_rapida, descricao_detalhada, valor, localizacao_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [imagens, nome_do_anuncio, localizacao, estrelas, descricao_rapida, descricao_detalhada, valor, localizacao_link], (err, result) => {
        if (err) {
            console.log("Erro ao inserir:", err);
            return res.status(500).send("Erro ao criar anúncio");
        }

        console.log("Anúncio criado ID:", result.insertId);
        res.redirect("/home/index.html"); // ou página de sucesso
    });
});

