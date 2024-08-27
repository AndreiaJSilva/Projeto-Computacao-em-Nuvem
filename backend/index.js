const express = require('express');
<<<<<<< HEAD
const path = require('path');
=======
>>>>>>> fb2c6669f0d7b3308d475f5938bcef498a521bae
const app = express();
const connection = require('./db'); // importar conexão com o banco de dados
const cors = require('cors'); 

<<<<<<< HEAD
app.use(express.static(path.join(__dirname, '../frontend')));
=======
// app.use(express.static(path.join(__dirname, 'frontend')));
>>>>>>> fb2c6669f0d7b3308d475f5938bcef498a521bae

// Middleware para JSON
app.use(express.json());
app.use(cors());

// Rota para listar clientes
app.get('/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/clientes', (req, res) => {
  const { nome, cpf, dataNascimento, email } = req.body;
  const sql = 'INSERT INTO clientes (nome, cpf, dataNascimento, email) VALUES (?, ?, ?, ?)';
  
  connection.query(sql, [nome, cpf, dataNascimento, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, nome, cpf, dataNascimento, email });
  });
});

<<<<<<< HEAD
 app.put('/clientes/:id', (req, res) => {
   const { id } = req.params;
   const { nome, email } = req.body;
   const sql = 'UPDATE clientes SET nome = ?, email = ? WHERE id = ?';
  
   connection.query(sql, [nome, email, id], (err, result) => {
     if (err) {
       return res.status(500).json({ error: err.message });
     }
     res.json({ message: 'Cliente atualizado com sucesso' });
   });
 });

 app.delete('/clientes/:id', (req, res) => {
   const { id } = req.params;
   const sql = 'DELETE FROM clientes WHERE id = ?';
  
   connection.query(sql, [id], (err, result) => {
     if (err) {
       return res.status(500).json({ error: err.message });
     }
     res.json({ message: 'Cliente deletado com sucesso' });
   });
 });
=======
// app.put('/clientes/:id', (req, res) => {
//   const { id } = req.params;
//   const { nome, email } = req.body;
//   const sql = 'UPDATE clientes SET nome = ?, email = ? WHERE id = ?';
  
//   connection.query(sql, [nome, email, id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ message: 'Cliente atualizado com sucesso' });
//   });
// });

// app.delete('/clientes/:id', (req, res) => {
//   const { id } = req.params;
//   const sql = 'DELETE FROM clientes WHERE id = ?';
  
//   connection.query(sql, [id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ message: 'Cliente deletado com sucesso' });
//   });
// });
>>>>>>> fb2c6669f0d7b3308d475f5938bcef498a521bae

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
