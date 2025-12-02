module.exports = function proteger(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ erro: "Acesso negado. Faça login." });
    }
    next();
};
