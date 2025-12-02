class Anuncio {
    constructor(id_anuncio, imagens, nome, localizacao, estrelas, descricao_rapida, descricao_detalhada, valor, localizacao_link) {
        this.id_anuncio = id_anuncio;
        this.imagens = imagens;
        this.nome = nome;
        this.localizacao = localizacao;
        this.estrelas = estrelas;
        this.descricao_rapida = descricao_rapida;
        this.descricao_detalhada = descricao_detalhada;
        this.valor = valor;
        this.localizacao_link = localizacao_link;
    }
}

module.exports = Anuncio;
