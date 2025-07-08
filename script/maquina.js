document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('maquina-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            console.log('Dados para enviar ao backend:', data);
            showToast('Máquina salva com sucesso!', 'success');
            form.reset();
        } catch (err) {
            console.error(err);
            showToast('Erro ao salvar máquina', 'error');
        }
    });
});