document.getElementById("submit").addEventListener("click", async (e) => {
    e.preventDefault(); // evita que a página recarregue

    // Pegando os valores do seu HTML
    const data = {
        imagens: document.getElementById("input-imagem").value, 
        nome_do_anuncio: document.getElementById("input-nome-do-anuncio").value,
        localizacao: document.getElementById("input-localizacao-escrito").value,
        estrelas: document.getElementById("input-estrelas-avaliacao").value,
        descricao_rapida: document.getElementById("input-descricao-curta").value,
        descricao_detalhada: document.getElementById("input-descricao-livre").value,
        valor: document.getElementById("input-valor").value,
    };

    try {
        const res = await fetch("/api/anuncios/criar-anuncio", {
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

const fotos = document.querySelectorAll('.fotos');
const containerInputs = document.querySelector('.adicionar-link-imagem');

let fotoIndex = 0;

function criarInput() {
    const novoInput = document.createElement('input');
    novoInput.type = "text";
    novoInput.placeholder = "Link de imagem";
    novoInput.classList.add("input-imagem");

    novoInput.addEventListener('change', () => handleImagem(novoInput));

    containerInputs.appendChild(novoInput);
}

function handleImagem(input) {
    const url = input.value.trim();
    if (!url) return;

    if (fotoIndex < fotos.length) {
        fotos[fotoIndex].style.backgroundImage = `url('${url}')`;
        fotoIndex++;
    }

    criarInput();
}

document.querySelector('.input-imagem')
        .addEventListener('change', (e) => handleImagem(e.target));
