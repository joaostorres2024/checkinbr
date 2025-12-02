async function updateAnnouncement() {
    const response = await fetch("/api/anuncios");
    const anuncios = await response.json();

    const lista = document.getElementById("bdInformations");

    lista.innerHTML = "";

    anuncios.forEach(a => {
        const bloco = `
          <div class="card">
              <img src="${a.imagens}" id="imagem-card" class="img">
              <h2 id="h2-card">${a.nome}</h2>
            <div class="localizacao-loc">
              <img id="pin" src="/img/lucide--map-pin.png" alt="">
              <p id="p-card">${a.localizacao}</p>
            </div>
            <div class="valor-botao">
              <span id="span-card">R$ ${a.valor} por noite</span>
              <button id="botao-direita" class="botao-direita" data-id="${a.id_anuncio}"><img id="icone-direita" src="/img/mingcute--right-line.png" alt=""></button>
            </div>
          </div>
        `;

        lista.innerHTML += bloco;
    });

    document.querySelectorAll(".botao-direita").forEach(botao => {
        botao.addEventListener("click", () => {
            const id = botao.getAttribute("data-id");
            window.location.href = `/anuncio-informacoes/anuncio-informacoes.html?id=${id}`;
        });
    });
}

updateAnnouncement();

// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {

    
    // Inicializar o mapa
    // Coordenadas iniciais: São Paulo, Brasil

    
    const map = L.map('map', {
        center: [-17.756611901769233, -48.60322215584704],
        zoom: 13,
        dragging: true,        // Desativa arrastar
        zoomControl: true,     // Remove controle de zoom
        scrollWheelZoom: false, // Desativa zoom com scroll
        doubleClickZoom: false, // Desativa zoom com duplo clique
        boxZoom: false,         // Desativa zoom por seleção
        touchZoom: false        // Desativa zoom por toque
    });


    // Adicionar camada de tiles do OpenStreetMap
   L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
    }).addTo(map);

    // Forçar o mapa a recalcular seu tamanho
    setTimeout(function() {
        map.invalidateSize();
    }, 100);

    // Adicionar mais alguns marcadores de exemplo
    const locations = [
        {
            coords: [-17.77478159882551, -48.5691538600917],
            title: 'Marina Flat & Náutica',
            description: 'R$350'
        },
        {
            coords: [-17.740833741172956, -48.63240688622075],
            title: 'Atrium Thermas',
            description: 'R$280'
        },
    ];

    // Adicionar marcadores ao mapa
    locations.forEach(location => {
        const marker = L.marker(location.coords).addTo(map);
        marker.bindPopup(`<b>${location.title}</b><br>${location.description}`);
    });

  })