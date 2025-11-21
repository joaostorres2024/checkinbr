const db = require("../db");
const Anuncio = require("../models/anuncio");

class AnuncioController {
    static criar(anuncio, callback) {
        const sql = `
            INSERT INTO anuncios
            (imagens, nome_do_anuncio, localizacao, estrelas, descricao_rapida, descricao_detalhada, valor, localizacao_link)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            anuncio.imagens,
            anuncio.nome,
            anuncio.localizacao,
            anuncio.estrelas,
            anuncio.descricaoRapida,
            anuncio.descricaoDetalhada,
            anuncio.valor,
            anuncio.localizacaoLink
        ];

        db.query(sql, values, callback);
    }

    static listar(callback) {
        db.query("SELECT * FROM anuncios", (err, rows) => {
            if (err) return callback(err);

            const anuncios = rows.map(r => new Anuncio(
                r.id,
                r.imagens,
                r.nome_do_anuncio,
                r.localizacao,
                r.estrelas,
                r.descricao_rapida,
                r.descricao_detalhada,
                r.valor,
                r.localizacao_link
            ));

            callback(null, anuncios);
        });
    }
}

class AnuncioController {
    static deletar(id, callback) {
        const sql = "DELETE FROM anuncios WHERE id = ?";
        db.query(sql, [id], callback);
    }
}


module.exports = AnuncioController;