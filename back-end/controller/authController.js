const db = require("../db"); // ajuste para o caminho correto

module.exports = {
    async login(req, res) {
        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.status(400).json({ erro: "Informe o usuario e a senha" });
        }

        try {
            // Busca o usuário no banco
            const [rows] = await db.query(
                "SELECT * FROM funcionarios WHERE usuario = ?",
                [usuario]
            );

            if (rows.length === 0)
                return res.status(401).json({ erro: "Usuário não encontrado" });

            const user = rows[0];

            // CONFERE SENHA
            if (senha !== user.senha) { 
                // (depois pode trocar por bcrypt)
                return res.status(401).json({ erro: "Senha incorreta" });
            }

            // SALVAR SESSÃO
            req.session.usuario = {
                id: user.id,
                usuario: user.usuario,
                admin: user.admin
            };

            res.json({ mensagem: "Login efetuado com sucesso" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro no servidor" });
        }
    }
};
