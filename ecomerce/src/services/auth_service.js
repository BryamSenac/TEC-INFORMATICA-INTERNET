const API_BASE_URL = 'http://localhost:3000/auth';

const getFetchOptions = (method, body = null) => {
  const options = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
};

const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-status`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Não autenticado');
    }

    return true;

  } catch (error) {
    console.warn('Falha no checkAuthStatus:', error);
    throw error;
  }
};

const login = async ({ email, password }) => {
  const apiPayload = { email, password };
  try {
    const response = await fetch(`
      ${API_BASE_URL}/login`, 
      getFetchOptions('POST', apiPayload),
    );
    const data = await response.json();

    if (!response.ok) {
      let errorMessage = data.message || 'Erro ao fazer login.';
      if (Array.isArray(data.message)) errorMessage = data.message.join(', ');
      throw new Error(errorMessage);
    }

    return true;

  } catch (error) {
    console.error('Falha no authService.login:', error);
    throw error;
  }
};

const register = async (userData) => {
  try {
    const response = await fetch(`
      ${API_BASE_URL}/register`, 
      getFetchOptions('POST', userData),
    );
    const data = await response.json();

    if (!response.ok) {
      let errorMessage = data.message || 'Erro ao registrar.';
      if (Array.isArray(data.message)) errorMessage = data.message.join(', ');
      throw new Error(errorMessage);
    }

    return true;

  } catch (error) {
    console.error('Falha no authService.register:', error);
    throw error;
  }
};

const logout = async () => {
  try {
    await fetch(`${API_BASE_URL}/logout`, getFetchOptions('POST'));
    return true; 
  } catch (error) {
    console.error('Falha no authService.logout:', error);
    return false;
  }
};

export const authService = {
  login,
  register,
  logout,
  checkAuthStatus,
};