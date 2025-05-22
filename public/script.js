const apiUrl = 'http://localhost:3000/pacientes';

// Função para adicionar um novo paciente
async function adicionarPaciente() {
    const paciente = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: {
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value
        }
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paciente)
    });

    const data = await response.json();
    alert('Paciente cadastrado com sucesso!');
    carregarPacientes();
}

// Função para carregar todos os pacientes cadastrados
async function carregarPacientes() {
    const response = await fetch(apiUrl);
    const pacientes = await response.json();
    const pacientesList = document.getElementById('pacientesList');
    pacientesList.innerHTML = ''; // Limpa a lista antes de renderizar

    pacientes.forEach(paciente => {
        const pacienteDiv = document.createElement('div');
        pacienteDiv.classList.add('paciente-item');
        pacienteDiv.innerHTML = `
            <p><strong>Nome:</strong> ${paciente.nome}</p>
            <p><strong>CPF:</strong> ${paciente.cpf}</p>
            <p><strong>Email:</strong> ${paciente.email}</p>
            <p><strong>Telefone:</strong> ${paciente.telefone}</p>
            <p><strong>Endereço:</strong> ${paciente.endereco.rua}, ${paciente.endereco.numero}, ${paciente.endereco.bairro}, ${paciente.endereco.cidade}, ${paciente.endereco.estado}</p>
            <button onclick="editarPaciente('${paciente._id}')">Editar</button>
            <button onclick="removerPaciente('${paciente._id}')">Remover</button>
        `;
        pacientesList.appendChild(pacienteDiv);
    });
}

// Função para preencher o formulário com os dados do paciente para edição
async function editarPaciente(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const paciente = await response.json();

    // Preenche os campos do formulário com os dados do paciente
    document.getElementById('nome').value = paciente.nome;
    document.getElementById('cpf').value = paciente.cpf;
    document.getElementById('data_nascimento').value = paciente.data_nascimento;
    document.getElementById('email').value = paciente.email;
    document.getElementById('telefone').value = paciente.telefone;
    document.getElementById('rua').value = paciente.endereco.rua;
    document.getElementById('numero').value = paciente.endereco.numero;
    document.getElementById('bairro').value = paciente.endereco.bairro;
    document.getElementById('cidade').value = paciente.endereco.cidade;
    document.getElementById('estado').value = paciente.endereco.estado;

    // Altera o texto do botão para "Atualizar"
    const botaoCadastrar = document.querySelector('button');
    botaoCadastrar.textContent = 'Atualizar';
    botaoCadastrar.setAttribute('onclick', `atualizarPaciente('${id}')`);
}

// Função para atualizar os dados de um paciente
async function atualizarPaciente(id) {
    const paciente = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: {
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value
        }
    };

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paciente)
    });

    const data = await response.json();
    alert('Paciente atualizado com sucesso!');
    carregarPacientes();

    // Resetar o formulário e o botão para "Cadastrar"
    const botaoCadastrar = document.querySelector('button');
    botaoCadastrar.textContent = 'Cadastrar';
    botaoCadastrar.setAttribute('onclick', 'adicionarPaciente()');
}

// Função para remover um paciente
async function removerPaciente(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    alert('Paciente removido com sucesso!');
    carregarPacientes();
}

function buscarEnderecoPorCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert("CEP inválido. Deve conter 8 dígitos.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
            alert("Erro ao buscar o CEP.");
        });
}

// Carrega os pacientes ao carregar a página
window.onload = carregarPacientes;