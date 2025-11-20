async function updateAnnouncement() {
    const response = await fetch("/api/anuncios");
    const anuncios = await response.json();

    const lista = document.getElementById("bdInformations");

    lista.innerHTML = ""; 

    anuncios.forEach(a => {
        const bloco = `
            <div class="card">
                <img src="${a.imagens}" class="img">
                <h2>${a.nome_do_anuncio}</h2>
                <p>${a.localizacao}</p>
                <span>Valor: R$ ${a.valor}</span>
            </div>
        `;

        lista.innerHTML += bloco;
    });
}

updateAnnouncement();
