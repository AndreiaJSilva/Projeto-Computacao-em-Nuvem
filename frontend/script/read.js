document.addEventListener('DOMContentLoaded', () => {
  const clientList = document.querySelector('#client-list');

  function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function carregarClientes() {
    axios
      .get('/clientes')
      .then((response) => {
        const clientes = response.data;
        clientList.innerHTML = ''; // Limpa a lista existente

        clientes.forEach((cliente) => {
          const li = document.createElement('li');
          li.className = 'client-item';
          li.innerHTML = `
            <span class="client-name">${cliente.nome}</span>
            <span class="client-name">${cliente.cpf}</span>
            <span class="client-name">${formatarData(
              cliente.dataNascimento,
            )}</span>
            <span class="client-name">${cliente.email}</span>
            <div class="client-actions">
              <button class="btn-secondary btn-update" data-cpf="${
                cliente.cpf
              }">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              </button>
              <button class="btn-secondary btn-delete" data-cpf="${
                cliente.cpf
              }">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              </button>
            </div>
          `;
          clientList.appendChild(li);
        });

        // Adiciona eventos para os botões de atualização e exclusão
        addEventListeners();
      })
      .catch((error) => {
        console.error('Erro ao carregar clientes:', error);
        alert('Ocorreu um erro ao carregar a lista de clientes.');
      });
  }

  function addEventListeners() {
    // Adiciona os eventos de clique para os botões de atualização e exclusão
    const updateButtons = document.querySelectorAll('.btn-update');
    const deleteButtons = document.querySelectorAll('.btn-delete');

    updateButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const cpf = button.getAttribute('data-cpf');
        // Abre o modal e carrega os dados do cliente
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
        axios
          .get(`/clientes/${cpf}`)
          .then((response) => {
            const cliente = response.data;
            document.getElementById('txtNome').value = cliente.nome;
            document.getElementById('txtCPF').value = cliente.cpf;
            document.getElementById('dateNasc').value = cliente.dataNascimento;
            document.getElementById('txtEmail').value = cliente.email;
            document
              .getElementById('formCadastro')
              .setAttribute('data-cpf', cpf);
          })
          .catch((error) => {
            console.error('Erro ao buscar cliente:', error);
            alert('Ocorreu um erro ao buscar o cliente.');
          });
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const cpf = button.getAttribute('data-cpf');
        axios
          .delete(`/clientes/${cpf}`)
          .then((response) => {
            alert('Cliente excluído com sucesso!');
            button.closest('.client-item').remove();
          })
          .catch((error) => {
            console.error('Erro ao excluir cliente:', error);
            alert('Ocorreu um erro ao excluir o cliente.');
          });
      });
    });
  }

  carregarClientes(); // Carrega a lista de clientes ao carregar a página
});
