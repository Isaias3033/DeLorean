document.getElementById("capsuleForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const texto = document.getElementById("texto").value;
    const arquivosInput = document.getElementById("arquivo").files;
    const dataFutura = document.getElementById("dataFutura").value;

    // Busca o usuário ativo
    const usuarios = JSON.parse(localStorage.getItem("usuariosCadastrados")) || [];
    const usuarioAtivo = localStorage.getItem("usuarioAtivo");

    const usuario = usuarios.find(user => user.email === usuarioAtivo);

    if (!usuario) {
        alert("Usuário ativo não encontrado!");
        return;
    }

    // Processa os arquivos enviados
    const arquivos = [];
    const filePromises = [];

    for (const arquivo of arquivosInput) {
        const reader = new FileReader();
        const filePromise = new Promise((resolve, reject) => {
            reader.onload = function () {
                arquivos.push({ nome: arquivo.name, conteudo: reader.result });
                resolve();
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(arquivo);
        });
        filePromises.push(filePromise);
    }

    // Aguarda todas as leituras de arquivo
    Promise.all(filePromises).then(() => {
        // Atualiza o usuário com os dados da cápsula
        usuario.capsula = { texto, arquivos };
        usuario.futureDate = new Date(dataFutura).toISOString();

        // Atualiza o localStorage
        localStorage.setItem("usuariosCadastrados", JSON.stringify(usuarios));

        alert("Cápsula criada com sucesso!");
        window.location.href = "contador.html";
    }).catch(error => {
        console.error("Erro ao processar arquivos:", error);
        alert("Houve um erro ao processar os arquivos.");
    });
});
