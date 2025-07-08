document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pip-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.tipo = "PIP"; // Adiciona o tipo para a listagem
        
        try {
            // Simulação: 
            data.id = Date.now();
            data.dateCreated = new Date().toISOString();
            
            let inventories = JSON.parse(localStorage.getItem('inventories')) || [];
            inventories.push(data);
            localStorage.setItem('inventories', JSON.stringify(inventories));
            
            showToast('PIP salvo com sucesso!', 'success');
            form.reset();
            renderTable(); // Atualiza a tabela se estiver visível
        } catch (err) {
            console.error(err);
            showToast('Erro ao salvar PIP', 'error');
        }
    });
});