/**
 * 📁 services/auth.service.js
 * * Serviço de autenticação real, usando a API Fetch.
 * Comunica com o backend NEST.
 */

// 1. URL base da sua API NEST
// Altere este valor para o endereço onde o seu backend está a rodar.
const BASE_URL = 'http://localhost:3000'; // Exemplo comum para NEST

/**
 * Função genérica para tratar respostas da API.
 * Verifica se a resposta foi bem-sucedida (status 200-299).
 * Se não, tenta extrair a mensagem de erro do JSON da API.
 */
async function handleResponse(response) {
    if (!response.ok) {
        // Tenta ler o corpo do erro (que a sua API NEST pode enviar)
        const errorData = await response.json().catch(() => {
            // Se o corpo do erro não for JSON ou estiver vazio
            return { message: `Erro HTTP ${response.status}: ${response.statusText}` };
        });
        
        // Lança um erro que será capturado pelo 'catch' no controller
        // Usa a mensagem da API (ex: "Email já existe") ou a mensagem genérica
        throw new Error(errorData.message || 'Ocorreu um erro na requisição.');
    }
    
    // Se a resposta for OK (status 200-299), retorna os dados em JSON
    return await response.json();
}

/**
 * Envia os dados de cadastro para a API.
 * Endpoint: /cad (ou o que definiste no Nest)
 */
export async function register(name, email, password, role) {
    
    const response = await fetch(`${BASE_URL}/cad`, {
        method: 'POST',
        headers: {
            // Informa à API que estamos a enviar dados em formato JSON
            'Content-Type': 'application/json'
        },
        // Converte o objeto JavaScript em uma string JSON
        body: JSON.stringify({ name, email, password, role }),
        
        // 'credentials: "include"' é necessário para que o navegador
        // aceite o 'Set-Cookie' (HttpOnly) da sua API no cadastro.
        credentials: 'include'
    });

    // Usa a nossa função para tratar a resposta
    return handleResponse(response);
}

/**
 * Envia os dados de login para a API.
 * Endpoint: /login
 */
export async function login(email, password) {

    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        
        // IMPORTANTE:
        // 'credentials: "include"' é essencial para duas coisas:
        // 1. Aceitar o cookie 'HttpOnly' que a API vai definir no login.
        // 2. Enviar esse cookie automaticamente em requisições futuras.
        credentials: 'include'
    });

    return handleResponse(response);
}

/**
 * Envia um pedido de logout para a API.
 * Endpoint: /logout
 * (Deixado pronto para a próxima tela)
 */
export async function logout() {

    const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST', // Usar POST para logout é uma boa prática
        headers: {
            'Content-Type': 'application/json'
        },
        // Envia o cookie de autenticação atual para que
        // a API saiba qual sessão deve invalidar.
        credentials: 'include' 
    });

    return handleResponse(response);
}