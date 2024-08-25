const buscarClienteBtn = document.getElementById('buscarCli');
const clienteEncontradoDiv = document.getElementById('cliente-encontrado');
const clienteNomeSpan = document.getElementById('cliente-nome');

listCliente = {

}

buscarClienteBtn.addEventListener('click', function() {
  // Simulação de busca (substitua por sua lógica de busca real)
  const cpfInformado = document.getElementById('cpfCli').value;
  const cliente = buscarClientePorCpf(cpfInformado); // Substitua por sua função de busca

  if (cliente) {
    clienteNomeSpan.textContent = cliente.nome; // Preenchendo o nome do cliente
    clienteEncontradoDiv.style.display = 'block'; // Exibindo a div com os novos elementos
  } else {
    alert('Cliente não encontrado!');
  }
});

// Função de busca (substitua pela sua implementação real)
function buscarClientePorCpf(cpf) {
  // Simulação: Retorna um objeto genérico com nome
  return { nome: 'Cliente Exemplo' };
}