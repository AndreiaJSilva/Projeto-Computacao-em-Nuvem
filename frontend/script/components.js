document.addEventListener('DOMContentLoaded', () => {
  const openModalButton = document.getElementById('openModal');
  const modal = document.getElementById('modal');
  const closeModalButton = document.querySelector('.close-modal');

  // Função para abrir o modal
  const openModal = () => {
    modal.style.display = 'flex';
  };

  // Função para fechar o modal
  const closeModal = () => {
    modal.style.display = 'none';
  };

  // Adicionar eventos para abrir e fechar o modal
  if (openModalButton) {
    openModalButton.addEventListener('click', openModal);
  }

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  // Fechar o modal se clicar fora da área do conteúdo
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
