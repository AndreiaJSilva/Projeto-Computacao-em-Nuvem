document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os botões de exclusão
  const deleteButtons = document.querySelectorAll('.btn-delete');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Obtém o CPF do atributo data-cpf
      const cpf = button.getAttribute('data-cpf');

      if (!cpf) {
        alert('CPF do cliente não encontrado.');
        return;
      }

      // Envia a solicitação para excluir o cliente
      axios
        .delete(`/clientes/${cpf}`)
        .then((response) => {
          alert('Cliente excluído com sucesso!');
          // Remove o item da lista do DOM
          button.closest('.client-item').remove();
        })
        .catch((error) => {
          console.error('Erro ao excluir cliente:', error);
          alert('Ocorreu um erro ao excluir o cliente.');
        });
    });
  });
});
