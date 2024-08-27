document.addEventListener('DOMContentLoaded', () => {
    const updateButtons = document.querySelectorAll('.btn-update');
    const modal = document.getElementById('modal');
    const form = document.getElementById('formCadastro');
    const closeModalButton = document.querySelector('.close-modal');
  
    updateButtons.forEach(button => {
      button.addEventListener('click', function() {
        const cpf = button.getAttribute('data-cpf');
  
        if (!cpf) {
          alert('CPF do cliente não encontrado.');
          return;
        }
  
        // Abre o modal
        modal.style.display = 'block';
  
        // Preenche o formulário com os dados do cliente
        axios.get(`/clientes/${cpf}`)
          .then(response => {
            const cliente = response.data;
            document.getElementById('txtNome').value = cliente.nome;
            document.getElementById('txtCPF').value = cliente.cpf;
            document.getElementById('dateNasc').value = cliente.dataNascimento;
            document.getElementById('txtEmail').value = cliente.email;
            // Armazena o CPF no formulário para usar na atualização
            form.setAttribute('data-cpf', cpf);
          })
          .catch(error => {
            console.error('Erro ao buscar cliente:', error);
            alert('Ocorreu um erro ao buscar o cliente.');
          });
      });
    });
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const cpf = form.getAttribute('data-cpf');
      const nome = document.getElementById('txtNome').value;
      const email = document.getElementById('txtEmail').value;
  
      const cliente = {
        nome: nome,
        email: email
      };
  
      axios.put(`/clientes/${cpf}`, cliente)
        .then(response => {
          alert('Cliente atualizado com sucesso!');
          modal.style.display = 'none'; // Fecha o modal
          // Atualiza a lista de clientes ou a página conforme necessário
        })
        .catch(error => {
          console.error('Erro ao atualizar cliente:', error);
          alert('Ocorreu um erro ao atualizar o cliente.');
        });
    });
  
    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none'; // Fecha o modal
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none'; // Fecha o modal se o usuário clicar fora dele
      }
    });
  });
  