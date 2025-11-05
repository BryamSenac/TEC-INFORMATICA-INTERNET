const API_BASE_URL = 'http://localhost:3000/auth';

const login = ({ email, password }) => {
    console.log('[AuthService] Modo de Login: SIMULADO');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'teste@teste.com' && password === '123456') {
                resolve({
                    user: { id: 1, name: 'Usuário Teste', email: 'teste@teste.com' },
                    token: 'fake-jwt-token-12345',
                });
            } else {
                reject(new Error('Email ou senha inválidos.'));
            }
        }, 1500);
    });
};

/**
 * Recebe os dados do hook (em inglês) e os envia para a API (em português).
 * @param {object} userData - { name, email, password }
 */
const register = async (userData) => {
    const apiPayload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiPayload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            let errorMessage = 'Erro ao registrar.';
            if (Array.isArray(errorData.message)) {
                errorMessage = errorData.message.join(', ');
            } else if (errorData.message) {
                errorMessage = errorData.message;
            }

            throw new Error(errorMessage);
        }

        return await response.json();

    } catch (error) {
        console.error('Falha no authService.register:', error);
        throw error;
    }
};

export const authService = {
    login,
    register,
};