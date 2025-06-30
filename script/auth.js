/* let currentUser = null;

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" }
];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-modal').style.display = 'block';

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      currentUser = user;
      document.getElementById('login-modal').style.display = 'none';
      showPage('home');
      showToast(`Bem-vindo, ${user.username}!`, 'success');

      if (user.role !== 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
      }
    } else {
      showToast('Credenciais inválidas!', 'error');
    }
  });
}); */

/* document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Impede o envio tradicional do form

  const email = document.getElementById('username').value;
  const senha = document.getElementById('password').value;

  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('token', data.token); // salva token
    alert('Login realizado!');
    // redireciona ou carrega dados
  } else {
    alert('Erro ao fazer login');
  }
}); */

function parseJwt (token) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1]; // pega só o meio do JWT
    return JSON.parse(atob(payload));    // decodifica Base64 → JSON
  } catch (e) {
    console.error('JWT inválido', e);
    return null;
  }
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('username').value.trim();
  const senha = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
      // 400‒499 → erro de credencial; 500+ → erro do servidor
      const msg = response.status === 401 ? 'Credenciais inválidas!' : 'Erro ao fazer login.';
      showToast(msg, 'error');
      return;
    }

    const { token } = await response.json();
    localStorage.setItem('token', token);         // grava token
    const payload = parseJwt(token);              // extrai dados do JWT
    const role = payload?.role || 'user';         // ajuste se o claim tiver outro nome

    // guarda o papel para usar depois
    localStorage.setItem('role', role);

    // oculta/mostra seções de acordo com o papel
    if (role !== 'user') {
      document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    } else {
      document.querySelectorAll('.admin-only').forEach(el => el.style.display = '');
    }

    document.getElementById('login-modal').style.display = 'none';
    showPage('home');             // carrega a página inicial autenticada
    showToast(`Bem‑vindo, ${payload.sub || email}!`, 'success');
  } catch (err) {
    console.error(err);
    showToast('Não foi possível entrar. Tente novamente.', 'error');
  }
});
