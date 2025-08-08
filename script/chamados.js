async function fetchChamados() {
    try {
        // Modo mock 
        const chamadosMock = [
            {
                id: 1,
                titulo: "Computador não liga",
                descricao: "O PC da sala 2 não está respondendo",
                status: "Aberto",
                prioridade: "Alta",
                dataCriacao: new Date().toISOString(),
                criador: JSON.parse(localStorage.getItem('usuarioLogado')).username
            }
        ];
        
        renderChamados(chamadosMock);
    } catch (error) {
        console.error("Erro ao carregar chamados:", error);
    }
}

function renderChamados(chamados) {
    const container = document.getElementById('chamados-list');
    if (!container) return;

    container.innerHTML = chamados.map(chamado => `
        <div class="ticket-card" onclick="alert('Chamado #${chamado.id}')">
            <h3>${chamado.titulo}</h3>
            <p>Status: ${chamado.status}</p>
        </div>
    `).join('');
}