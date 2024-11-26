// Obtém os dados do usuário ativo
const usuarios = JSON.parse(localStorage.getItem("usuariosCadastrados")) || [];
const usuarioAtivo = localStorage.getItem("usuarioAtivo");

const usuario = usuarios.find(user => user.email === usuarioAtivo);

if (usuario && usuario.capsula) {
    // Exibe o texto
    document.getElementById("textoCapsula").textContent = usuario.capsula.texto;

    // Exibe as imagens e vídeos
    const arquivosList = document.getElementById("arquivosCapsula");
    usuario.capsula.arquivos.forEach(arquivo => {
        const listItem = document.createElement("li");

        // Verifica o tipo do arquivo
        if (arquivo.conteudo.startsWith("data:image/")) {
            // Renderiza como imagem
            const img = document.createElement("img");
            img.src = arquivo.conteudo;
            img.alt = arquivo.nome;
            img.style.maxWidth = "200px"; // Ajusta o tamanho da imagem, se necessário
            listItem.appendChild(img);
        } else if (arquivo.conteudo.startsWith("data:video/")) {
            // Renderiza como vídeo
            const video = document.createElement("video");
            video.src = arquivo.conteudo;
            video.controls = true; // Permite controle de reprodução
            video.style.maxWidth = "200px"; // Ajusta o tamanho do vídeo, se necessário
            listItem.appendChild(video);
        } else {
            // Caso seja outro tipo de arquivo, exibe como link
            const link = document.createElement("a");
            link.href = arquivo.conteudo;
            link.download = arquivo.nome;
            link.textContent = arquivo.nome;
            listItem.appendChild(link);
        }

        arquivosList.appendChild(listItem);
    });
} else {
    alert("Nenhuma cápsula encontrada para este usuário.");
    window.location.href = "criar_maquina.html"; // Redireciona se não houver cápsula
}