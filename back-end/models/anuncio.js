class Anuncio {
    constructor(id, imagens, nome_do_anuncio, localizacao, estrelas, descricao_rapida, descricao_detalhada, valor, localizacao_link) {
        this.id = id;
        this.imagens = imagens;
        this.nome_do_anuncio = nome_do_anuncio;
        this.localizacao = localizacao;
        this.estrelas = estrelas;
        this.descricao_rapida = descricao_rapida;
        this.descricao_detalhada = descricao_detalhada;
        this.valor = valor;
        this.localizacao_link = localizacao_link;
    }
}

module.exports = Anuncio;
