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
              <div class="localizacao-loc">
                <img id="pin" src="/img/lucide--map-pin.png" alt="">
                <p id = "p-card">${a.localizacao}</p>
              </div>
              <div class="valor-botao">
                <span id = "span-card">R$ ${a.valor} por noite</span>
                <button id="botao-direita"><img id="icone-direita" src="/img/mingcute--right-line.png" alt=""></button>
              </div>
            </div>
        `;

        lista.innerHTML += bloco;
    });
}

updateAnnouncement();