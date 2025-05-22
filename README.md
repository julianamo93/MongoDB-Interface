# MongoDB Interface Project - SmartoothDB

- RM 554113 - Juliana Moreira - Modelgem de Dados e Cloud
- RM 552590 - Kevin Nobre - Desenvolvedor Mobile e .NET
- RM 552728 - Sabrina Couto - Desenvolvedora Backend Java e QA

##

Este projeto foi desenvolvido como parte da sprint4 **Mastering Relational and Non-Relational Databases** (FIAP) para o Challenge da ODONTOPREV, nossa solução SmartoothAI, e tem como objetivo demonstrar o uso de MongoDB (NoSQL) em conjunto com uma aplicação Node.js para manipulação de dados de forma eficiente.

A aplicação permite realizar operações CRUD (Create, Read, Update, Delete) em documentos armazenados no MongoDB por meio de uma interface simples.

## 🧰 Tecnologias Utilizadas

- Node.js  
- Express  
- MongoDB  
- Mongoose  
- EJS (caso a interface seja renderizada no servidor)  
- Bootstrap (opcional para estilização)  

---

## 🚀 Como Executar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/julianamo93/MongoDB-Interface.git
cd MongoDB-Interface

npm install

npm expo start
```

## 🧪 Funcionalidades
📄 Criação de documentos com atributos personalizados
🔍 Leitura e listagem dos dados salvos no banco
✏️ Atualização de documentos existentes
❌ Exclusão de documentos
💾 Exportação de dados para JSON (via mongoexport)

## 💾 Comando para exportar os dados (MongoDB)
Certifique-se de que o MongoDB está rodando e use o seguinte comando para exportar documentos da coleção consultas do banco smartooth para um arquivo JSON:

```bash
mongoexport --uri="mongodb://localhost:27017" --db=smartooth --collection=consultas --out=consultas.json
```
