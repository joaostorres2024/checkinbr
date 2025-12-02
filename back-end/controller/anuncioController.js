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
            anuncio.descricao_rapida,
            anuncio.descricao_detalhada,
            anuncio.valor,
            anuncio.localizacao_link
        ];

        db.query(sql, values, callback);
    }

    static listar(callback) {
        db.query("SELECT * FROM anuncios", (err, rows) => {
            if (err) return callback(err);

            const anuncios = rows.map(r => new Anuncio(
                r.id_anuncio,            
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

    static deletar(id_anuncio, callback) {
        const sql = "DELETE FROM anuncios WHERE id_anuncio = ?";
        db.query(sql, [id_anuncio], (err, result) => {
        if (err) return callback(err);
        if (result.affectedRows === 0) return callback(new Error("Anúncio não encontrado"));
        callback(null, result);
    });
}

    static buscarPorId(id, callback) {
        const sql = "SELECT * FROM anuncios WHERE id_anuncio = ?";
        db.query(sql, [id], (err, rows) => {
            if (err) return callback(err);
            if (rows.length === 0) return callback(null, null);

            const r = rows[0];
            const anuncio = new Anuncio(
                r.id_anuncio,
                r.imagens,
                r.nome_do_anuncio,
                r.localizacao,
                r.estrelas,
                r.descricao_rapida,
                r.descricao_detalhada,
                r.valor,
                r.localizacao_link
            );

        callback(null, anuncio);
        });
    }
    
// editar anuncios
    static editar(id, anuncio, callback) {
    const sql = `
        UPDATE anuncios SET
            imagens = ?,
            nome_do_anuncio = ?,
            localizacao = ?,
            estrelas = ?,
            descricao_rapida = ?,
            descricao_detalhada = ?,
            valor = ?,
            localizacao_link = ?
        WHERE id_anuncio = ?
    `;

    const values = [
        anuncio.imagens,
        anuncio.nome,
        anuncio.localizacao,
        anuncio.estrelas,
        anuncio.descricao_rapida,
        anuncio.descricao_detalhada,
        anuncio.valor,
        anuncio.localizacao_link,
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) return callback(err);
        if (result.affectedRows === 0) return callback(new Error("Anúncio não encontrado"));
        callback(null, result);
    });
}
}

module.exports = AnuncioController;
