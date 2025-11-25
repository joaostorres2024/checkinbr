document.addEventListener("DOMContentLoaded", () => {
    carregarAnuncios();
});

async function carregarAnuncios() {
    const resposta = await fetch("/api/anuncios"); 
    const anuncios = await resposta.json();

    const container = document.getElementById("bdInformations");
    container.innerHTML = "";

    anuncios.forEach(anuncio => {
        const div = document.createElement("div");
        div.classList.add("anuncio-item");

        div.innerHTML = `
            <div class="card">
                <img src="${anuncio.imagens}" class="img">
                <h2>${anuncio.nome}</h2>
                <p>ID: ${anuncio.id_anuncio}</p>
                <p>${anuncio.localizacao}</p>
                <span>Valor: R$ ${anuncio.valor}</span>

                <button onclick = "deletarAnuncio(${anuncio.id_anuncio})" class="btn-deletar">
                    Deletar
                </button>
            </div>
        `;

        container.appendChild(div);
    });

    console.log("ANUNCIOS:", anuncios);
}

async function deletarAnuncio(id) {
    console.log("ID recebido:", id);
    if (!confirm("Deseja realmente deletar este anúncio?")) return;

    const resposta = await fetch(`/api/anuncios/deletar/${id}`, { 
        method: "DELETE"
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.erro || "Erro desconhecido");
    }

    const data = await resposta.json();

    alert(data.sucesso ? "Anúncio deletado!" : "Erro ao deletar");

    carregarAnuncios();
    console.log(err, "Erro ao deletar" + err.message);
}

