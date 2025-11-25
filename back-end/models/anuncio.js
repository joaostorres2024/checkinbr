class Anuncio {
    constructor(id_anuncio, imagens, nome, localizacao, estrelas, descricaoRapida, descricaoDetalhada, valor, localizacaoLink) {
        this.id_anuncio = id_anuncio;
        this.imagens = imagens;
        this.nome = nome;
        this.localizacao = localizacao;
        this.estrelas = estrelas;
        this.descricaoRapida = descricaoRapida;
        this.descricaoDetalhada = descricaoDetalhada;
        this.valor = valor;
        this.localizacaoLink = localizacaoLink;
    }
}

module.exports = Anuncio;
