const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "front-end")));

const anuncioRoutes = require("./back-end/routes/anuncioRoutes");
app.use(anuncioRoutes);

app.get("/", (req, res) => {
    res.redirect("/home/index.html");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
