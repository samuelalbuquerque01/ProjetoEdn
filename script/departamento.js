document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('departamento-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            //chamada para o backend
            // Simulando uma resposta do servidor
            console.log('Dados para enviar ao backend:', data);
            showToast('Departamento salvo com sucesso!', 'success');
            form.reset();
            
            // Atualiza a lista de departamentos para o formulário de usuário
            atualizarDepartamentos();
        } catch (err) {
            console.error(err);
            showToast('Erro ao salvar departamento', 'error');
        }
    });
});

function limparForm(formId) {
    const form = document.getElementById(formId);
    if (confirm('Deseja realmente apagar todos os dados do formulário?')) {
        form.reset();
        showToast('Formulário limpo', 'info');
    }
}

// Função para atualizar a lista de departamentos no formulário de usuário
function atualizarDepartamentos() {
    // Simulando busca de departamentos
    const departamentos = ['TI', 'RH', 'Financeiro', 'Administrativo'];
    const select = document.querySelector('#usuario-form select[name="departamento"]');
    
    select.innerHTML = '<option value="">Selecione...</option>';
    departamentos.forEach(depto => {
        const option = document.createElement('option');
        option.value = depto;
        option.textContent = depto;
        select.appendChild(option);
    });
}