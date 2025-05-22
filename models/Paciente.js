const mongoose = require('mongoose');

// Definindo o esquema para o endereço
const enderecoSchema = new mongoose.Schema({
  rua: { type: String, required: true },
  numero: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true }
});

// Definindo o esquema do paciente com todos os campos obrigatórios
const pacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true },
  data_nascimento: { type: Date, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  endereco: { 
    type: enderecoSchema,
    required: true
  }
});

module.exports = mongoose.model('Paciente', pacienteSchema);
