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
                <img src="${anuncio.imagens}" class="img-card">
                <div>                    
                    <h2 class="h2-card">${anuncio.nome}</h2>
                    <p class="p-card">${anuncio.localizacao}</p>
                    <div class="preco-botao">
                      <span class="span-card">R$ ${anuncio.valor}</span>
                      <button onclick="redirecionarParaEdicao(${anuncio.id_anuncio})" class="btn-editar">Editar</button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

function redirecionarParaEdicao(id) {
  window.location.href = `/editar-anuncio/campo-de-edicao.html?id=${id}`;
}