async function carregarAnuncio() {
    // PEGAR O ID DA URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    console.log("ID recebido:", id); // DEBUG

    if (!id) {
        console.error("ID não encontrado na URL");
        return;
    }

    // BUSCAR O ANÚNCIO NA ROTA PÚBLICA
    try {
        const res = await fetch(`/api/anuncios/publico/${id}`);

        if (!res.ok) {
            console.error("Erro ao buscar anúncio:", res.status);
            return;
        }

        const anuncio = await res.json();

        console.log("Anúncio recebido:", anuncio); // DEBUG

        // COLOQUE AQUI O QUE SUA PÁGINA PRECISA MUDAR
    document.getElementById("imagens").src = anuncio.imagens;
    document.getElementById("nome").innerText = anuncio.nome; 
    document.getElementById("localizacao").innerText = anuncio.localizacao;
    document.getElementById("estrelas").innerText = anuncio.estrelas;
    document.getElementById("descricao_rapida").innerText = anuncio.descricao_rapida; 
    document.getElementById("descricao_detalhada").innerText = anuncio.descricao_detalhada; 
    document.getElementById("valor").innerText = "R$ " + anuncio.valor;
    document.getElementById("localizacao_link").innerText = anuncio.localizacao_link;

    } catch (error) {
        console.error("Erro ao carregar anúncio:", error);
    }
}

carregarAnuncio();
