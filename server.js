const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const proteger = require("./back-end/middleware/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "front-end")));

app.use(session({
    secret: "CodigoChaveCheckin", 
    resave: false,
    saveUninitialized: false
}));

app.get("/admin/admin.html", proteger, (req, res) => {
    res.sendFile(path.join(__dirname, "front-end/admin/admin.html"));
});

app.get("/editar-anuncio/editar-anuncio.html", proteger, (req, res) => {
    res.sendFile(path.join(__dirname, "front-end/editar-anuncio/editar-anuncio.html"));
});

app.get("/excluir-anuncio/excluir-anuncio.html", proteger, (req, res) => {
    res.sendFile(path.join(__dirname, "front-end/excluir-anuncio/excluir-anuncio.html"));
});

app.get("/novo-anuncio/novoanuncio.html", proteger, (req, res) => {
    res.sendFile(path.join(__dirname, "front-end/novo-anuncio/novoanuncio.html"));
});

const authRoutes = require("./back-end/routes/authRoutes");
app.use("/", authRoutes);

const anuncioRoutes = require("./back-end/routes/anuncioRoutes");
app.use("/api/anuncios", anuncioRoutes);

app.get("/", (req, res) => {
    res.redirect("/home/index.html");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
