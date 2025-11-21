async function updateAnnouncement() {
    const response = await fetch("/api/anuncios");
    const anuncios = await response.json();

    const lista = document.getElementById("bdInformations");

    lista.innerHTML = ""; 

    anuncios.forEach(a => {
        const bloco = `
            <div class="card">
                <img src="${a.imagens}" id = "imagem-card" class="img">
                <h2 id = "h2-card">${a.nome}</h2>
                <p id = "p-card">${a.localizacao}</p>
                <span id = "span-card">Valor: R$ ${a.valor}</span>
            </div>
        `;

        lista.innerHTML += bloco;
    });
}

updateAnnouncement();

async function carregarAnuncios() {
    const res = await fetch("/api/anuncios"); // sua rota de listar
    const anuncios = await res.json();
    
    const container = document.getElementById("lista-anuncios");
    container.innerHTML = ""; // limpar

    anuncios.forEach(a => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>${a.nome_do_anuncio}</strong>
            <button onclick="deletarAnuncio(${a.id})">Deletar</button>
        `;
        container.appendChild(div);
    });
}

async function deletarAnuncio(id) {
    const confirmar = confirm("Tem certeza que quer deletar?");
    if (!confirmar) return;

    const res = await fetch(`/deletar-anuncio/${id}`, {
        method: "DELETE"
    });
    const data = await res.json();
    console.log(data);

    carregarAnuncios(); // atualizar lista
}

carregarAnuncios();