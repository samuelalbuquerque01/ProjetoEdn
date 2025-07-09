document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('relacionamento-page')) return;
    
    // Carrega usuários no dropdown
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const selectUsuario = document.getElementById('select-usuario');
    
    selectUsuario.innerHTML = '<option value="">Selecione um usuário</option>';
    usuarios.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.nome;
        selectUsuario.appendChild(option);
    });

    // Evento para o botão Editar
    document.getElementById('btn-editar-relacionamento').addEventListener('click', () => {
        const usuarioId = document.getElementById('select-usuario').value;
        if (usuarioId) iniciarModoEdicao(usuarioId);
    });

    // Evento para o botão Salvar
    document.getElementById('btn-salvar-relacionamento').addEventListener('click', salvarEdicoes);
});

function carregarRelacionamentos(usuarioId) {
    const infoDiv = document.getElementById('info-relacionamento');
    infoDiv.style.display = 'none';
    
    if (!usuarioId) return;

    try {
        // Busca os dados
        const usuario = JSON.parse(localStorage.getItem('usuarios')).find(u => u.id == usuarioId);
        const departamento = JSON.parse(localStorage.getItem('departamentos')).find(d => d.id == usuario.departamentoId);
        const maquina = JSON.parse(localStorage.getItem('maquinas')).find(m => m.usuarioId == usuarioId);
        const softwares = JSON.parse(localStorage.getItem('software')).filter(s => s.usuarioId == usuarioId) || [];
        const pip = JSON.parse(localStorage.getItem('pip')).find(p => p.usuarioId == usuarioId);

        // Monta os cards
        infoDiv.innerHTML = `
            <div class="relacionamento-card">
                <div class="card-header">
                    <i class="fas fa-user"></i>
                    <h3>Usuário</h3>
                </div>
                <p><strong>Nome:</strong> ${usuario.nome}</p>
                <p><strong>ID:</strong> ${usuario.id}</p>
            </div>

            <div class="relacionamento-card">
                <div class="card-header">
                    <i class="fas fa-building"></i>
                    <h3>Departamento</h3>
                </div>
                <p id="info-departamento">${departamento?.nome || 'Não atribuído'}</p>
            </div>

            <div class="relacionamento-card">
                <div class="card-header">
                    <i class="fas fa-laptop"></i>
                    <h3>Máquina</h3>
                </div>
                <div id="info-maquina">
                    ${maquina ? `
                        <p><strong>Modelo:</strong> ${maquina.placa_mae}</p>
                        <p><strong>Processador:</strong> ${maquina.processador}</p>
                        <p><strong>Memória:</strong> ${maquina.memoria}</p>
                    ` : '<p>Não atribuída</p>'}
                </div>
            </div>

            <div class="relacionamento-card">
                <div class="card-header">
                    <i class="fas fa-code"></i>
                    <h3>Softwares</h3>
                </div>
                <ul class="software-list" id="info-software">
                    ${softwares.length > 0 ? 
                        softwares.map(s => `
                            <li>
                                ${s.nome} 
                                <small>(${s.serial})</small>
                            </li>
                        `).join('') 
                        : '<li>Nenhum software vinculado</li>'}
                </ul>
            </div>

            <div class="relacionamento-card">
                <div class="card-header">
                    <i class="fas fa-box"></i>
                    <h3>PIP</h3>
                </div>
                <div id="info-pip">
                    ${pip ? `
                        <p><strong>Nome:</strong> ${pip.nome}</p>
                        <p><strong>ID:</strong> ${pip.id}</p>
                    ` : '<p>Não atribuído</p>'}
                </div>
            </div>
        `;

        infoDiv.style.display = 'grid';
        document.getElementById('btn-editar-relacionamento').style.display = 'inline-block';
        document.getElementById('btn-salvar-relacionamento').style.display = 'none';

    } catch (error) {
        console.error("Erro ao carregar:", error);
        showToast('Erro ao carregar relacionamentos', 'error');
    }
}

// ========== FUNÇÕES DE EDIÇÃO ==========
function iniciarModoEdicao(usuarioId) {
    const usuario = JSON.parse(localStorage.getItem('usuarios')).find(u => u.id == usuarioId);
    
    // Adiciona classe de edição ao container
    document.getElementById('info-relacionamento').classList.add('edit-mode');

    // Departamento
    document.getElementById('info-departamento').innerHTML = `
        <select id="editar-departamento" class="edit-select">
            ${JSON.parse(localStorage.getItem('departamentos')).map(d => 
                `<option value="${d.id}" ${d.id == usuario.departamentoId ? 'selected' : ''}>${d.nome}</option>`
            ).join('')}
        </select>
    `;

    // Máquina
    document.getElementById('info-maquina').innerHTML = `
        <select id="editar-maquina" class="edit-select">
            <option value="">Nenhuma máquina</option>
            ${JSON.parse(localStorage.getItem('maquinas')).map(m => 
                `<option value="${m.id}" ${m.usuarioId == usuarioId ? 'selected' : ''}>
                    ${m.placa_mae} (${m.processador})
                </option>`
            ).join('')}
        </select>
    `;

    // Softwares
    const softwares = JSON.parse(localStorage.getItem('software')) || [];
    document.getElementById('info-software').innerHTML = `
        <select id="editar-softwares" multiple class="edit-select">
            ${softwares.map(s => 
                `<option value="${s.id}" ${s.usuarioId == usuarioId ? 'selected' : ''}>
                    ${s.nome} (${s.serial})
                </option>`
            ).join('')}
        </select>
        <small class="text-muted">Pressione Ctrl para selecionar múltiplos</small>
    `;

    // PIP
    const pips = JSON.parse(localStorage.getItem('pip')) || [];
    document.getElementById('info-pip').innerHTML = `
        <select id="editar-pip" class="edit-select">
            <option value="">Nenhum PIP</option>
            ${pips.map(p => 
                `<option value="${p.id}" ${p.usuarioId == usuarioId ? 'selected' : ''}>${p.nome}</option>`
            ).join('')}
        </select>
    `;

    // Atualiza botões
    document.getElementById('btn-editar-relacionamento').style.display = 'none';
    document.getElementById('btn-salvar-relacionamento').style.display = 'inline-block';
}

function salvarEdicoes() {
    const usuarioId = document.getElementById('select-usuario').value;
    if (!usuarioId) return;

    try {
        // 1. Atualiza Departamento
        const novoDepartamentoId = document.getElementById('editar-departamento').value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const usuarioIndex = usuarios.findIndex(u => u.id == usuarioId);
        usuarios[usuarioIndex].departamentoId = parseInt(novoDepartamentoId);

        // 2. Atualiza Máquina
        const novaMaquinaId = document.getElementById('editar-maquina').value;
        const maquinas = JSON.parse(localStorage.getItem('maquinas'));
        maquinas.forEach(m => {
            m.usuarioId = m.id == parseInt(novaMaquinaId) ? usuarioId : null;
        });

        // 3. Atualiza Softwares
        const softwaresSelecionados = Array.from(
            document.getElementById('editar-softwares').selectedOptions
        ).map(opt => parseInt(opt.value));
        
        const softwares = JSON.parse(localStorage.getItem('software'));
        softwares.forEach(s => {
            s.usuarioId = softwaresSelecionados.includes(s.id) ? usuarioId : null;
        });

        // 4. Atualiza PIP
        const pipId = document.getElementById('editar-pip').value;
        const pips = JSON.parse(localStorage.getItem('pip'));
        pips.forEach(p => {
            p.usuarioId = p.id == parseInt(pipId) ? usuarioId : null;
        });

        // Salva todas as alterações
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('maquinas', JSON.stringify(maquinas));
        localStorage.setItem('software', JSON.stringify(softwares));
        localStorage.setItem('pip', JSON.stringify(pips));

        showToast('Alterações salvas com sucesso!', 'success');
        
        // Volta para o modo visualização
        carregarRelacionamentos(usuarioId);

    } catch (error) {
        console.error("Erro ao salvar:", error);
        showToast('Erro ao salvar alterações', 'error');
    }
}