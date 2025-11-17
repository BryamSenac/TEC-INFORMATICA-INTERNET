/**
 * 📁 services/task.service.js
 * * Serviço para toda a lógica de tarefas (Tasks).
 * Comunica-se com a API NEST.
 */

// URL base da API (a mesma do auth.service)
const BASE_URL = 'http://localhost:3000';

/**
 * Função genérica para tratar respostas da API.
 * (Copiada do auth.service, mas adaptada para o 204 No Content)
 */
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
            message: `Erro HTTP ${response.status}: ${response.statusText}` 
        }));
        throw new Error(errorData.message || 'Ocorreu um erro na requisição.');
    }

    // Verifica se a resposta tem conteúdo JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        // Se tiver JSON, retorna o JSON
        return await response.json();
    }
    
    // Se for 200 OK ou 204 No Content sem JSON (comum em PUT/PATCH/DELETE),
    // apenas retorna um sucesso genérico.
    return { success: true }; 
}

/**
 * Busca todas as tarefas de um usuário específico.
 * Endpoint: GET /tasks?userId=123
 */
export async function getAllTasks(userId) {
    // Nota: A API poderia também inferir o usuário pelo cookie,
    // mas filtrar por userId é comum se um admin puder ver
    // tarefas de outros.
    const response = await fetch(`${BASE_URL}/tasks?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Envia o cookie de sessão
    });
    return handleResponse(response);
}

/**
 * Atualiza o status de uma tarefa (concluída ou não).
 * Endpoint: PUT /tasks/:taskId
 * @param {string|number} taskId - O ID da tarefa a ser atualizada.
 * @param {boolean} isCompleted - O novo estado (true ou false).
 */
export async function updateTaskStatus(taskId, isCompleted) {
    
    // Usa o ID da tarefa na própria URL (padrão RESTful)
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        // PUT (substitui) ou PATCH (modifica parcialmente).
        // Usar PATCH seria mais "correto" por modificar só um campo,
        // mas PUT é comum.
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Envia o cookie
        
        // Enviamos no corpo APENAS o campo que queremos alterar.
        // A API NEST (com um Partial DTO) deve aceitar isso.
        body: JSON.stringify({
            feito: isCompleted 
        })
    });

    return handleResponse(response);
}