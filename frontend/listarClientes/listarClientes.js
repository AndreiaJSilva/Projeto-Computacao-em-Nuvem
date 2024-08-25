axios.get('/clientes')
  .then(response => {
    const clientes = response.data;
    console.log(clientes); // Exibir ou manipular os dados como necessário
    // Você pode adicionar código aqui para exibir os dados no HTML
  })
  .catch(error => {
    console.error('Erro ao buscar clientes:', error);
  });
