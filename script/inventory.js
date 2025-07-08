// 1. Variável global para relacionamentos
const relacionamentos = {
    usuarios: JSON.parse(localStorage.getItem('usuarios')) || [],
    maquinas: JSON.parse(localStorage.getItem('maquinas')) || [],
    pips: JSON.parse(localStorage.getItem('pip')) || [],
    softwares: JSON.parse(localStorage.getItem('software')) || [],
    departamentos: JSON.parse(localStorage.getItem('departamentos')) || []
};

// 2. Função de filtro 
function filterInventory() {
    const term = document.getElementById('inventory-search').value.toLowerCase();
    const rows = document.querySelectorAll('#inventory-body tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
    });
}

// 3. Função para mostrar detalhes 
window.mostrarDetalhesUsuario = function(usuarioId) {
    const usuario = relacionamentos.usuarios.find(u => u.id === usuarioId);
    if (!usuario) return;

    document.getElementById('detalhes-nome-usuario').textContent = usuario.nome;
    document.getElementById('detalhes-departamento').textContent = 
        relacionamentos.departamentos.find(d => d.id === usuario.departamentoId)?.nome || 'N/A';

    const maquinaVinculada = relacionamentos.maquinas.find(m => m.usuarioId === usuarioId);
    if (maquinaVinculada) {
        document.getElementById('maquina-modelo').textContent = maquinaVinculada.placa_mae;
        document.getElementById('maquina-cpu').textContent = maquinaVinculada.processador;
        document.getElementById('maquina-ram').textContent = maquinaVinculada.memoria;
    }

    const pipVinculado = relacionamentos.pips.find(p => p.usuarioId === usuarioId);
    if (pipVinculado) {
        document.getElementById('pip-codigo').textContent = pipVinculado.codigo;
        document.getElementById('pip-data').textContent = 
            new Date(pipVinculado.dataCadastro).toLocaleDateString('pt-BR');
    }

    const softwareList = document.getElementById('detalhes-software');
    softwareList.innerHTML = '';
    relacionamentos.softwares
        .filter(s => s.usuarioId === usuarioId)
        .forEach(soft => {
            const li = document.createElement('li');
            li.textContent = `${soft.nome} (${soft.serial})`;
            softwareList.appendChild(li);
        });

    document.getElementById('detalhes-usuario').style.display = 'block';
};

// 4. Função para fechar detalhes
window.fecharDetalhes = function() {
    document.getElementById('detalhes-usuario').style.display = 'none';
};

// 5. Simulação de dados
function simularDadosTeste() {
    if (!window.location.href.includes("index.html")) return;

    if (!localStorage.getItem('usuarios')) {
        console.warn("⚠️ Criando dados de teste...");
        
        const mockData = {
            usuarios: [
                { id: 1, nome: "João Silva (TESTE)", departamentoId: 1, dataCadastro: new Date() }
            ],
            departamentos: [
                { id: 1, nome: "TI-MOCK" }
            ],
            maquinas: [
                { 
                    id: 101, 
                    placa_mae: "MOCK-DELL", 
                    processador: "i7-MOCK", 
                    memoria: "16GB",
                    usuarioId: 1
                }
            ],
            pip: [
                { id: 201, codigo: "PIP-TESTE", usuarioId: 1, dataCadastro: new Date() }
            ],
            software: [
                { id: 301, nome: "Windows", serial: "123-456", usuarioId: 1 }
            ]
        };

        Object.entries(mockData).forEach(([key, value]) => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    }
}

// 6. Carregar inventário
function loadFullInventory() {
    const tbody = document.getElementById('inventory-body');
    if (!tbody) {
        console.error("Elemento 'inventory-body' não encontrado!");
        return;
    }
    
    tbody.innerHTML = '';

    // Adiciona usuários
    relacionamentos.usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="badge usuário">USUÁRIO</span></td>
            <td>${usuario.nome}</td>
            <td>Depto: ${relacionamentos.departamentos.find(d => d.id === usuario.departamentoId)?.nome || 'N/A'}</td>
            <td>${new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</td>
            <td class="actions">
                <button onclick="mostrarDetalhesUsuario(${usuario.id})">
                    <i class="fas fa-search"></i> Detalhes
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Adicionar outras categorias aqui caso seja nescessario
}

// 7. Inicialização
function initInventory() {
    try {
        if (!document.getElementById('list-page')) return;

        simularDadosTeste();
        loadFullInventory();

        const searchInput = document.getElementById('inventory-search');
        if (searchInput) {
            searchInput.addEventListener('input', filterInventory);
        }

    } catch (error) {
        console.error("Erro ao inicializar inventário:", error);
    }
}

// 8. Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initInventory);