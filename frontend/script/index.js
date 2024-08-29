function formatarDataBR(dataISO) {
  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function formatarDataUS(dataISO) {
  const data = new Date(dataISO);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const clientList = document.getElementById('client-list');

  const clientCount = document.getElementById('client-count');

  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const form = document.getElementById('form-cadastro');

  const confirmModal = document.getElementById('confirm-modal');
  const confirmDeleteButton = document.getElementById('confirm-delete');
  const cancelDeleteButton = document.getElementById('cancel-delete');

  let cpfForEdition = null;
  let cpfForDeletion = null;

  /* List clients */
  function listClients() {
    axios
      .get('http://18.231.168.144:3000/clientes')
      .then((response) => {
        const clientes = response.data;
        clientList.innerHTML = '';

        clientes.forEach((cliente) => {
          const li = document.createElement('li');
          li.className = 'client-item';
          li.innerHTML = `
            <div class="client-info">
              <p class="client-name">${cliente.nome}</p>
              <div>
                <p>CPF: ${cliente.cpf}</p>
                <p>Data de Nasc.: ${formatarDataBR(cliente.data_nascimento)}</p>
                <p>Email: ${cliente.email}</p>
              </div>
            </div>
            <div class="client-actions">
              <button class="btn-secondary btn-update" data-cpf="${
                cliente.cpf
              }">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </button>
              <button class="btn-red btn-delete" data-cpf="${cliente.cpf}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          `;
          clientList.appendChild(li);
        });

        clientCount.textContent = `${clientes.length} ${
          clientes.length > 1 ? 'clientes' : 'cliente'
        }`;

        addEventListeners();
      })
      .catch((error) => {
        console.error('Erro ao carregar clientes:', error);
        alert('Ocorreu um erro ao carregar a lista de clientes.');
      });
  }

  /* Listeners for delete and update */
  function addEventListeners() {
    const updateButtons = document.querySelectorAll('.btn-update');
    const deleteButtons = document.querySelectorAll('.btn-delete');
    document.getElementById('txtCPF').disabled = true;

    updateButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const cpf = button.getAttribute('data-cpf');

        modal.style.display = 'flex';
        modalTitle.textContent = 'Editar Cliente';

        axios
          .get(`http://18.231.168.144:3000/clientes/${cpf}`)
          .then((response) => {
            const cliente = response.data;
            cpfForEdition = cliente.cpf;
            document.getElementById('txtNome').value = cliente.nome;
            document.getElementById('txtCPF').value = cliente.cpf;
            document.getElementById('dateNasc').value = formatarDataUS(
              cliente.data_nascimento,
            );
            document.getElementById('txtEmail').value = cliente.email;
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
        cpfForDeletion = cpf;
        confirmModal.style.display = 'flex';
      });
    });

    document.getElementById('modal-close').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    document
      .getElementById('confirm-modal-close')
      .addEventListener('click', () => {
        confirmModal.style.display = 'none';
      });

    cancelDeleteButton.addEventListener('click', () => {
      confirmModal.style.display = 'none';
    });

    confirmDeleteButton.addEventListener('click', () => {
      if (cpfForDeletion) {
        axios
          .delete(`http://18.231.168.144:3000/clientes/${cpfForDeletion}`)
          .then((response) => {
            document
              .querySelector(`.btn-delete[data-cpf="${cpfForDeletion}"]`)
              .closest('.client-item')
              .remove();
            listClients();
            confirmModal.style.display = 'none';
          })
          .catch((error) => {
            console.error('Erro ao excluir cliente:', error);
            alert('Ocorreu um erro ao excluir o cliente.');
            confirmModal.style.display = 'none';
          });
      }
    });
  }

  /* Create or Update client */
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('txtNome').value;
    const cpf = document.getElementById('txtCPF').value;
    const dataNascimento = document.getElementById('dateNasc').value;
    const email = document.getElementById('txtEmail').value;

    const cliente = {
      nome: nome,
      cpf: cpf,
      data_nascimento: dataNascimento,
      email: email,
    };

    if (cpfForEdition) {
      // Update current client
      axios
        .put(`http://18.231.168.144:3000/clientes/${cpfForEdition}`, cliente)
        .then((response) => {
          modal.style.display = 'none';
          form.reset();
          listClients();
        })
        .catch((error) => {
          console.error('Erro ao atualizar cliente:', error);
          alert('Ocorreu um erro ao atualizar o cliente.');
        });
    } else {
      // Add new client
      axios
        .post('http://18.231.168.144:3000/clientes', cliente)
        .then((response) => {
          modal.style.display = 'none';
          form.reset();
          listClients();
        })
        .catch((error) => {
          console.error('Erro ao cadastrar cliente:', error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            alert(error.response.data.error);
          } else {
            alert('Ocorreu um erro ao cadastrar o cliente.');
          }
        });
    }

    cpfForEdition = null;
  });

  /* Open Add Modal */
  document.getElementById('open-add-modal').addEventListener('click', () => {
    modal.style.display = 'flex';
    modalTitle.textContent = 'Cadastrar Cliente';
    document.getElementById('txtCPF').disabled = false;
    form.reset();
  });

  /* Close Modal */
  document.getElementById('modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  listClients();
});
