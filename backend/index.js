const express = require('express');
const path = require('path');
const app = express();
const connection = require('./db');
const cors = require('cors');

app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware para JSON
app.use(express.json());
app.use(cors());

app.get('/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes';

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/clientes/:cpf', (req, res) => {
  const { cpf } = req.params;
  const sql = 'SELECT * FROM clientes WHERE cpf = ?';

  connection.query(sql, [cpf], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.json(results[0]);
  });
});

app.post('/clientes', (req, res) => {
  const { nome, cpf, dataNascimento, email } = req.body;

  if (!nome || !cpf || !dataNascimento || !email) {
    return res.status(400).json({
      error:
        'Todos os campos (nome, cpf, dataNascimento e email) são necessários',
    });
  }

  const checkCpfSql = 'SELECT * FROM clientes WHERE cpf = ?';

  connection.query(checkCpfSql, [cpf], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: 'Este CPF já está cadastrado no sistema' });
    }

    const insertSql =
      'INSERT INTO clientes (nome, cpf, dataNascimento, email) VALUES (?, ?, ?, ?)';

    connection.query(
      insertSql,
      [nome, cpf, dataNascimento, email],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res
          .status(201)
          .json({ id: result.insertId, nome, cpf, dataNascimento, email });
      },
    );
  });
});

app.put('/clientes/:cpf', (req, res) => {
  const { cpf } = req.params;
  const { nome, dataNascimento, email } = req.body;

  if (!nome || !dataNascimento || !email) {
    return res.status(400).json({
      error: 'Todos os campos (nome, dataNascimento e email) são necessários',
    });
  }

  const sql =
    'UPDATE clientes SET nome = ?, dataNascimento = ?, email = ? WHERE cpf = ?';

  connection.query(sql, [nome, dataNascimento, email, cpf], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.json({ message: 'Cliente atualizado com sucesso' });
  });
});

app.delete('/clientes/:cpf', (req, res) => {
  const { cpf } = req.params;
  const sql = 'DELETE FROM clientes WHERE cpf = ?';

  connection.query(sql, [cpf], (err, result) => {
    if (err) {
      console.error('Erro ao deletar cliente:', err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.json({ message: 'Cliente deletado com sucesso' });
  });
});

process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error(
        'Erro ao fechar a conexão com o banco de dados:',
        err.stack,
      );
      process.exit(1);
    } else {
      console.log('Conexão com o banco de dados fechada.');
      process.exit(0);
    }
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
