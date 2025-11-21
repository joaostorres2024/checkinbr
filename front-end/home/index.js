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