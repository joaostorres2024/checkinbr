const fotos = document.querySelectorAll('.fotos');
const containerInputs = document.querySelector('.adicionar-link-imagem');
const btnAddImagem = document.getElementById('btn-add-imagem');

document.getElementById("submit").addEventListener("click", async (e) => {
    e.preventDefault();

    const data = {
        imagens: JSON.stringify(imagens),
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

let fotoIndex = 0;
let imagens = [];

btnAddImagem.addEventListener('click', () => {
    if (fotoIndex >= fotos.length) return alert("Limite de imagens atingido");

    const input = document.createElement('input');
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    input.addEventListener('change', () => {
        const file = input.files[0];
        if (!file) return;

        const indexAtual = fotoIndex;

        const reader = new FileReader();
        reader.onload = () => {
            const foto = fotos[indexAtual];
            foto.style.backgroundImage = `url('${reader.result}')`;

            // 🔴 BOTÃO EXCLUIR DENTRO DO GRID
            const btnExcluir = document.createElement('span');
            btnExcluir.innerText = "Excluir";
            btnExcluir.classList.add('btn-excluir');

            btnExcluir.addEventListener('click', () => {
                foto.style.backgroundImage = '';
                btnExcluir.remove();
                imagens.splice(indexAtual, 1);
                fotoIndex--;
            });

            foto.appendChild(btnExcluir);

            imagens.push(file);
            fotoIndex++;
        };

        reader.readAsDataURL(file);
    });

    containerInputs.appendChild(input);
    input.click();
});
