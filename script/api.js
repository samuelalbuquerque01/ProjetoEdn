// api.js - Código completo
const API_URL = 'http://localhost:8080';

async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (response.status === 401) {
      logout();
      return null;
    }

    return response;
  } catch (error) {
    console.error('API Error:', error);
    showToast('Erro na comunicação com o servidor', 'error');
    throw error;
  }
}