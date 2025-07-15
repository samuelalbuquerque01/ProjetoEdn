document.addEventListener('DOMContentLoaded', async function() {
    // Verifica autenticação
    if (!checkAuth()) return;

    // Carrega todos os dados necessários
    await Promise.all([
        loadDepartamentosRelacionamento(),
        loadUsuarios(),
        loadMaquina(),
        loadSoftware(),
        loadPIP()
    ]);

    // Configura o evento de submit do formulário
    document.getElementById('relacionamento-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        // Obtém os valores do formulário
        const idUsuario = document.getElementById('nomeUsuarioo').value;
        const idDepartamento = document.getElementById('relacionamento-departamento').value;
        const idMaquina = document.getElementById('nomeMaquina').value;
        const idSoftware = document.getElementById('nomeSoftware').value;
        const idSuprimento = document.getElementById('nomePip').value;

        // Validação básica
        if (!idUsuario || !idDepartamento || !idMaquina || !idSoftware || !idSuprimento) {
            showToast('Preencha todos os campos obrigatórios', 'error');
            return;
        }

        try {
            // Envia os dados para a API
            const response = await authFetch('/relacionamento', {
                method: 'POST',
                body: JSON.stringify({
                    idUsuario,
                    idDepartamento,
                    idMaquina,
                    idSoftware,
                    idSuprimento
                })
            });

            if (response) {
                showToast('Relacionamento cadastrado com sucesso!', 'success');
                this.reset();
                // Atualiza a lista de inventário se estiver na página
                if (typeof fetchData === 'function') {
                    fetchData();
                }
            }
        } catch (error) {
            console.error('Erro ao cadastrar relacionamento:', error);
            showToast('Erro ao cadastrar relacionamento', 'error');
        }
    });

    // Evento para carregar detalhes da máquina selecionada
    document.getElementById('nomeMaquina').addEventListener('change', async function() {
        const maquinaId = this.value;
        if (maquinaId) {
            const maquina = await fetchMaquina(maquinaId);
            if (maquina) {
                document.getElementById('marcaProcessador').value = maquina.marcaProcessador;
                document.getElementById('processador').value = maquina.processador;
                document.getElementById('modeloMemoria').value = maquina.modeloMemoria;
                document.getElementById('frequenciaMemoria').value = maquina.frequenciaMemoria;
                document.getElementById('quantidadeMemoria').value = maquina.quantidadeMemoria;
                document.getElementById('tipoArmazenamento').value = maquina.tipoArmazenamento;
                document.getElementById('quantidadeArmazenamento').value = maquina.quantidadeArmazenamento;
            }
        }
    });
});

// Funções para carregar os selects
async function loadDepartamentosRelacionamento() {
    try {
        const response = await authFetch('/departamento');
        if (response) {
            const departamentos = await response.json();
            const select = document.getElementById('relacionamento-departamento');
            select.innerHTML = '<option value="">Selecione...</option>';
            
            departamentos.forEach(depto => {
                const option = document.createElement('option');
                option.value = depto.idDepartamento;
                option.textContent = depto.nomeDepartamento;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
        showToast('Erro ao carregar departamentos', 'error');
    }
}

async function loadUsuarios() {
    try {
        const response = await authFetch('/usuario');
        if (response) {
            const usuarios = await response.json();
            const select = document.getElementById('nomeUsuarioo');
            select.innerHTML = '<option value="">Selecione...</option>';
            
            usuarios.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.idUsuario;
                option.textContent = usuario.nomeUsuario;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        showToast('Erro ao carregar usuários', 'error');
    }
}

async function loadMaquina() {
    try {
        const response = await authFetch('/maquina');
        if (response) {
            const maquinas = await response.json();
            const select = document.getElementById('nomeMaquina');
            select.innerHTML = '<option value="">Selecione...</option>';
            
            maquinas.forEach(maquina => {
                const option = document.createElement('option');
                option.value = maquina.idMaquina;
                option.textContent = maquina.placaMae;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar máquinas:', error);
        showToast('Erro ao carregar máquinas', 'error');
    }
}

async function loadPIP() {
    try {
        const response = await authFetch('/pip');
        if (response) {
            const pips = await response.json();
            const select = document.getElementById('nomePip');
            select.innerHTML = '<option value="">Selecione...</option>';
            
            pips.forEach(pip => {
                const option = document.createElement('option');
                option.value = pip.idPip;
                option.textContent = pip.nomePip;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar PIPs:', error);
        showToast('Erro ao carregar PIPs', 'error');
    }
}

async function loadSoftware() {
    try {
        const response = await authFetch('/software');
        if (response) {
            const softwares = await response.json();
            const select = document.getElementById('nomeSoftware');
            select.innerHTML = '<option value="">Selecione...</option>';
            
            softwares.forEach(software => {
                const option = document.createElement('option');
                option.value = software.idSoftware;
                option.textContent = software.nomeSoftware;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar softwares:', error);
        showToast('Erro ao carregar softwares', 'error');
    }
}

// Função auxiliar para buscar detalhes da máquina
async function fetchMaquina(maquinaId) {
    try {
        const response = await authFetch(`/maquina/${maquinaId}`);
        if (response) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar máquina:', error);
        return null;
    }
}