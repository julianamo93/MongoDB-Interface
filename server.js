require('dotenv').config(); 
console.log('MONGODB_URI:', process.env.MONGODB_URI);  
console.log('PORT:', process.env.PORT);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Paciente = require('./models/Paciente');
const app = express();
const path = require('path');

// Middleware para tratar JSON
app.use(bodyParser.json());

// Serve arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Rota para a página inicial (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro na conexão com o MongoDB:', err));

// Rota para obter todos os pacientes
app.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um paciente específico pelo ID
app.get('/pacientes/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para criar um novo paciente
app.post('/pacientes', async (req, res) => {
  const { nome, cpf, data_nascimento, email, telefone, endereco } = req.body;

  if (!nome || !cpf || !data_nascimento || !email || !telefone || !endereco) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const novoPaciente = new Paciente(req.body);
    await novoPaciente.save();
    res.status(201).json(novoPaciente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um paciente existente
app.put('/pacientes/:id', async (req, res) => {
  const { nome, cpf, data_nascimento, email, telefone, endereco } = req.body;

  if (!nome || !cpf || !data_nascimento || !email || !telefone || !endereco) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado para atualização' });
    }
    res.json(paciente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um paciente
app.delete('/pacientes/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndDelete(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado para exclusão' });
    }
    res.json({ message: 'Paciente removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rodando o servidor na porta configurada
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});