document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    
console.log(id);

    if (!id) {
        alert("Nenhum anúncio selecionado!");
        return;
    }

    // Buscar dados do anúncio (precisa existir GET /api/anuncios/:id no backend)
    const resposta = await fetch(`/api/anuncios/${id}`);
    const anuncio = await resposta.json();

    // Preencher os campos com os dados recebidos
    document.getElementById("adicionar-fotos-botao").value = anuncio.imagens;
    document.getElementById("input-nome-do-anuncio").value = anuncio.nome; 
    document.getElementById("input-localizacao-escrito").value = anuncio.localizacao;
    document.getElementById("input-estrelas-avaliacao").value = anuncio.estrelas;
    document.getElementById("input-descricao-curta").value = anuncio.descricaoRapida; 
    document.getElementById("input-descricao-livre").value = anuncio.descricaoDetalhada; 
    document.getElementById("input-valor").value = anuncio.valor;
    document.getElementById("input-localizacao-link").value = anuncio.localizacaoLink; 
    document.getElementById("input-calendario").value = anuncio.data || ""; 

    // Enviar alterações
    document.getElementById("submit").addEventListener("click", async (e) => {
        e.preventDefault();

    const dadosAtualizados = {
        imagens: document.getElementById("adicionar-fotos-botao").value,
        nome: document.getElementById("input-nome-do-anuncio").value,
        localizacao: document.getElementById("input-localizacao-escrito").value,
        estrelas: document.getElementById("input-estrelas-avaliacao").value,
        descricao_rapida: document.getElementById("input-descricao-curta").value,
        descricao_detalhada: document.getElementById("input-descricao-livre").value,
        valor: document.getElementById("input-valor").value,
        localizacao_link: document.getElementById("input-localizacao-link").value
    };

    const res = await fetch(`/api/anuncios/editar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados)
    });

    const resultado = await res.json();
        alert(resultado.sucesso ? "Anúncio atualizado com sucesso!" : "Erro ao atualizar");
        window.location.href = "/admin/admin.html";
    });
});