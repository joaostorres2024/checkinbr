document.getElementById("btn-login").addEventListener("click", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (!usuario || !senha) {
        alert("Preencha usuário e senha!");
        return;
    }

    try {
        const resposta = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro || "Usuário ou senha incorretos.");
            return;
        }

        // Salva token
        localStorage.setItem("token", dados.token);

        // Sucesso
        alert("Login realizado!");
        window.location.href = "/admin/admin.html";

    } catch (erro) {
        alert("Erro de conexão com o servidor.");
    }
});
