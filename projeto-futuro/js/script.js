document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    let usuarios =
      JSON.parse(localStorage.getItem("usuariosCadastrados")) || [];

    // Obtém os valores dos campos do formulário de cadastro
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("password").value;

    // Verifica se o e-mail já está cadastrado
    if (usuarios.some((user) => user.email === email)) {
      alert("E-mail já cadastrado!");
      return;
    }

    // Cria um objeto representando o novo usuário
    const NovoUser = {
      username: username,
      email: email,
      senha: senha,
      futureDate: "", // Data futura (inicialmente vazia)
    };

    usuarios.push(NovoUser);

    // Armazena o array atualizado no localStorage
    localStorage.setItem("usuariosCadastrados", JSON.stringify(usuarios));

    // Define o usuário ativo
    localStorage.setItem("usuarioAtivo", email);

    alert("Usuário cadastrado e ativo!");
    window.location.href = "criar_capsula.html";
  });
