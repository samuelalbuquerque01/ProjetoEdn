document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('usuario-form');
    
    // Carrega departamentos ao carregar a página
    atualizarDepartamentos();
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            //chamada para o backend
            console.log('Dados para enviar ao backend:', data);
            showToast('Usuário salvo com sucesso!', 'success');
            form.reset();
        } catch (err) {
            console.error(err);
            showToast('Erro ao salvar usuário', 'error');
        }
    });
});