const API_BASE_URL = 'http://localhost:3000/auth';

const login = async ({ email, password }) => {
  const apiPayload = {
    email,
    password,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    });
    const data = await response.json();

    if (!response.ok) {
      let errorMessage = 'Erro ao fazer login.';
      if (Array.isArray(data.message)) {
        errorMessage = data.message.join(', ');
      } else if (data.message) {
        errorMessage = data.message;
      }
      throw new Error(errorMessage);
    }

    if (data.access_token) {
      localStorage.setItem('authToken', data.access_token);
    }
    return true;

  } catch (error) {
    console.error('Falha no authService.login:', error);
    throw error;
  }
};

const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = 'Erro ao registrar.';
      if (Array.isArray(data.message)) {
        errorMessage = data.message.join(', ');
      } else if (data.message) {
        errorMessage = data.message;
      }
      throw new Error(errorMessage);
    }

    if (data.token) {
      localStorage.setItem('authToken', data.access_token);
    }

    return true;

  } catch (error) {
    console.error('Falha no authService.register:', error);
    throw error;
  }
};

export const authService = {
  login,
  register,
};