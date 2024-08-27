// Espera o DOM ser carregado antes de adicionar o evento ao formulário
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastro');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('txtNome').value;
    const cpf = document.getElementById('txtCPF').value;
    const dataNascimento = document.getElementById('dateNasc').value;
    const email = document.getElementById('txtEmail').value;

    // Cria um objeto com os dados do formulário
    const cliente = {
      nome: nome,
      cpf: cpf,
      dataNascimento: dataNascimento,
      email: email,
    };

    // Envia os dados para o backend usando axios
    axios
      .post('/clientes', cliente)
      .then((response) => {
        console.log('Cliente cadastrado com sucesso:', response.data);
        alert('Cliente cadastrado com sucesso!');
        form.reset(); // Limpa os campos do formulário após o cadastro
      })
      .catch((error) => {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Ocorreu um erro ao cadastrar o cliente.');
      });
  });
});
