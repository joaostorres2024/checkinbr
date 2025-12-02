const express = require("express");
const router = express.Router();
const proteger = require("../middleware/auth");


router.post("/login", (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario === "MariaADM" && senha === "SENHAtemporaria0102") {
        req.session.user = {
            nome: usuario
        };

        return res.status(200).json({ ok: true });
    }

    return res.status(401).json({ erro: "Credenciais inválidas" });
});

module.exports = router;
