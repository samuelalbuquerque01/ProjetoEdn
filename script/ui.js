async function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const selectedPage = document.getElementById(`${pageId}-page`);
  selectedPage.classList.add('active');

  if (pageId === 'home') {
    initCharts();
  } else if (pageId === 'chamados') {
    renderDashboard(selectedPage);
    await pegarQtdChamadosEmAbertosAdmin();
    await pegarQtdChamadosEmTratativaAdmin();
    await pegarQtdChamadosResolvidosAdmin();
    await updateTicketsList();
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const themeBtn = document.querySelector('.theme-toggle');
  themeBtn.innerHTML = document.body.classList.contains('dark-mode')
    ? '<i class="fas fa-sun"></i> TEMA CLARO'
    : '<i class="fas fa-moon"></i> TEMA ESCURO';
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Avaliar se está sendo chamada em algum lugar antes de apagar
// function showToast(message, type = 'info') {
//   document.querySelectorAll('.toast').forEach(toast => toast.remove());
//   const toast = document.createElement('div');
//   toast.className = `toast toast-${type} animate__animated animate__fadeInUp`;
//   toast.textContent = message;
//   document.body.appendChild(toast);
//   setTimeout(() => {
//     toast.classList.add('animate__fadeOut');
//     setTimeout(() => toast.remove(), 500);
//   }, 3000);
// }


   function showToast(message, type = 'info') {
       const container = document.getElementById('toast-container');
       
       // Cria o toast
       const toast = document.createElement('div');
       toast.className = `toast toast-${type}`; // Usando suas classes
       toast.textContent = message;
       
       // Adiciona o toast ao container
       container.appendChild(toast);
       
       // Animação de entrada
       toast.style.transform = 'translateY(100%)';
       toast.style.opacity = '0';
       setTimeout(() => {
           toast.style.transition = 'all 0.3s ease';
           toast.style.transform = 'translateY(0)';
           toast.style.opacity = '1';
       }, 10);
       
       // Remove após 3 segundos
       setTimeout(() => {
           toast.style.transform = 'translateY(100%)';
           toast.style.opacity = '0';
           setTimeout(() => toast.remove(), 300);
       }, 3000);
   }


// É chamado assim que o usuário realizar login
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário foi redirecionado após o login
    const params = new URLSearchParams(window.location.search);
    if (params.get('login') === 'success') {
        const email = localStorage.getItem('lastLoginEmail');
        showToast(`Bem‑vindo, ${email}!`, 'success');
        
        // Limpa o parâmetro para não exibir novamente
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

function limparForm(formId) {
    const form = document.getElementById(formId);
    if (confirm('Deseja realmente apagar todos os dados do formulário?')) {
        form.reset();
        showToast('Formulário limpo', 'info');
    }
}