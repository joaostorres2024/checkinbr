document.getElementById("submit").addEventListener("click", async (e) => {
    e.preventDefault(); // evita que a página recarregue

    // Pegando os valores do seu HTML
    const data = {
        imagens: document.getElementById("adicionar-fotos-botao").value, // você vai mudar depois para pegar várias imagens
        nome_do_anuncio: document.getElementById("input-nome-do-anuncio").value,
        localizacao: document.getElementById("input-localizacao-escrito").value,
        estrelas: document.getElementById("input-estrelas-avaliacao").value,
        descricao_rapida: document.getElementById("input-descricao-curta").value,
        descricao_detalhada: document.getElementById("input-descricao-livre").value,
        valor: document.getElementById("input-valor").value,
        localizacao_link: document.getElementById("input-calendario").value
    };

    try {
        const res = await fetch("/criar-anuncio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert("Anúncio criado com sucesso!");
            window.location.href = "/home/index.html";
        } else {
            alert("Erro ao criar anúncio.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro de conexão com o servidor.");
    }
});