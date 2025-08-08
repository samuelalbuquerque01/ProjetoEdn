// script/ui.js
function showPage(pageId) {
    // Esconde todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Mostra a página selecionada
    const page = document.getElementById(`${pageId}-page`);
    if (page) {
        page.classList.add('active');
        
        // Carrega os dados específicos de cada página quando ativada
        switch(pageId) {
            case 'home':
                initCharts();
                loadTotalItens();
                loadTotalMaquinas();
                loadUltimoCadastro();
                break;
            case 'list':
                fetchData();
                break;
            case 'chamados':
                fetchChamados();
                break;
            case 'relacionamento':
                loadDepartamentosRelacionamento();
                loadUsuarios();
                loadMaquina();
                loadSoftware();
                loadPIP();
                break;
        }
    }

    // Atualiza o menu ativo
    updateActiveMenu(pageId);
}

function updateActiveMenu(pageId) {
    document.querySelectorAll('.menu button').forEach(button => {
        button.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`.menu button[onclick="showPage('${pageId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function limparForm(formId) {
    document.getElementById(formId).reset();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        document.querySelector('.theme-toggle').innerHTML = `<i class="fas fa-sun"></i> TEMA CLARO`;
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        document.querySelector('.theme-toggle').innerHTML = `<i class="fas fa-moon"></i> TEMA ESCURO`;
    }
}

// Função para exportar dados para CSV
function exportToCSV() {
    const table = document.getElementById('full-inventory-table');
    const rows = table.querySelectorAll('tr');
    let csv = [];

    for (let i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll('td, th');
        
        for (let j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }
        
        csv.push(row.join(';'));
    }

    const csvContent = csv.join('\n');
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inventario.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Funções para manipulação de chamados
async function fetchChamados() {
    try {
        // Implementação real com sua API
        const response = await fetch('http://localhost:8080/chamados');
        const chamados = await response.json();
        
        // Ou use localStorage para demonstração:
        // const chamados = JSON.parse(localStorage.getItem('chamados')) || [];
        
        renderChamados(chamados);
        updateChamadosCounters(chamados);
    } catch (error) {
        console.error('Erro ao carregar chamados:', error);
        showToast('Erro ao carregar chamados', 'error');
    }
}

function renderChamados(chamados) {
    const container = document.getElementById('chamados-list');
    if (!container) return;

    const user = JSON.parse(localStorage.getItem('usuarioLogado'))?.username || 'desconhecido';
    const userChamados = chamados.filter(c => c.criador === user);
    
    if (userChamados.length === 0) {
        container.innerHTML = '<p class="no-results">Nenhum chamado encontrado</p>';
        return;
    }

    container.innerHTML = userChamados.map(chamado => `
        <div class="ticket-card status-${chamado.status.toLowerCase().replace(' ', '-')}" 
             onclick="renderChamadoDetalhes(${chamado.id})">
            <div class="ticket-header">
                <span class="ticket-id">#${chamado.id}</span>
                <span class="ticket-status">${chamado.status}</span>
            </div>
            <h3>${chamado.titulo}</h3>
            <p>${chamado.descricao.substring(0, 100)}...</p>
            <div class="ticket-footer">
                <span>🕒 ${formatarData(chamado.dataCriacao)}</span>
                <span>📌 ${chamado.prioridade}</span>
            </div>
        </div>
    `).join('');
}

function updateChamadosCounters(chamados) {
    const user = JSON.parse(localStorage.getItem('usuarioLogado'))?.username || 'desconhecido';
    const userChamados = chamados.filter(c => c.criador === user);
    
    document.getElementById('abertos-count').textContent = 
        userChamados.filter(c => c.status === 'Aberto').length;
    document.getElementById('andamento-count').textContent = 
        userChamados.filter(c => c.status === 'Em andamento').length;
    document.getElementById('resolvidos-count').textContent = 
        userChamados.filter(c => c.status === 'Resolvido').length;
}

function renderChamadoDetalhes(id) {
    // Implemente conforme necessário
    console.log('Detalhes do chamado:', id);
    showToast('Funcionalidade em desenvolvimento', 'info');
}

function renderNewChamado() {
    // Implemente a criação de novo chamado
    console.log('Novo chamado');
    showToast('Funcionalidade em desenvolvimento', 'info');
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação
    const token = localStorage.getItem('token');
    if (!token && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }

    // Configura tema inicial
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
        document.querySelector('.theme-toggle').textContent = ' TEMA CLARO';
    }

    // Mostra página inicial
    showPage('home');
});
