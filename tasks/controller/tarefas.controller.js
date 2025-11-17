/**
 * 📁 controller/tarefas.controller.js
 * * Controlador da tela principal de tarefas.
 */

// 1. Importa o View desta tela e os Services
import * as View from '../view/tarefas.view.js';
// Importa o logout do serviço de autenticação
import { logout } from '../services/auth.service.js';
// Importa os serviços específicos de tarefas
import { getAllTasks, updateTaskStatus } from '../services/task.service.js';

//Arquivo de teste basta trocar os importes de serviço por esse para testar
// import { logout, getAllTasks, updateTaskStatus } from '../services/test.service.js';

/**
 * Lida com o clique no botão de logout.
 */
async function handleLogout() {
    try {
        // 1. Chama a API para invalidar a sessão/cookie
        await logout();
        
        // 2. Se a API der sucesso, limpa os dados locais
        sessionStorage.removeItem('user');
        
        // 3. Redireciona para a tela de login
        window.location.href = 'index.html';

    } catch (error) {
        // Mostra um erro se o logout falhar (ex: API offline)
        console.error('Erro ao fazer logout:', error);
        alert(`Não foi possível fazer logout: ${error.message}`);
    }
}

/**
 * Busca as tarefas da API e manda o View renderizá-las.
 * @param {string|number} userId - O ID do usuário para buscar as tarefas.
 * @param {string} userRole - O cargo do usuário (ex: "DEV").
 */
async function loadTasks(userRole) {
    try {
        // 1. Mostra uma mensagem de "carregando"
        View.setMainContentMessage('A carregar tarefas...');
        
        // 2. Chama o serviço (Model/Service)
        const tasks = await getAllTasks(userRole);
        
        // 3. Manda o View renderizar as tarefas
        View.renderTasks(tasks, userRole);

    } catch (error) {
        // 4. Se falhar, mostra o erro
        console.error('Erro ao carregar tarefas:', error);
        View.setMainContentMessage(`Erro ao carregar tarefas: ${error.message}`);
    }
}

/**
 * Lida com a mudança no checkbox de uma tarefa.
 * É chamado pelo Event Delegation no 'init'.
 */
async function handleTaskStatusChange(event) {
    // 1. Identifica o alvo e os dados
    const checkbox = event.target;
    const card = checkbox.closest('.task-card'); // Encontra o "cartão" pai
    
    if (!card) return; // Se, por algum motivo, não encontrar o cartão, para.
    
    const taskId = card.dataset.taskId;    // Pega o ID que guardámos no dataset
    const isCompleted = checkbox.checked;  // Pega o novo estado (true/false)

    // 2. Feedback de UI: Desabilita o checkbox enquanto salva
    checkbox.disabled = true;

    try {
        // 3. Chama o serviço (Model/Service)
        await updateTaskStatus(taskId, isCompleted);
        
        // 4. Sucesso!
        // O View é atualizado visualmente (CSS)
        // apenas se a requisição for bem-sucedida.
        // Adiciona/remove a classe de "concluído"
        card.classList.toggle('task-completed', isCompleted);
        
    } catch (error) {
        // 5. Falha! Mostra um erro e REVERTE a mudança no checkbox
        console.error('Erro ao atualizar tarefa:', error);
        alert(`Erro ao salvar: ${error.message}\n\nA alteração será desfeita.`);
        // Reverte o checkbox para o estado anterior
        checkbox.checked = !isCompleted;
    } finally {
        // 6. Independentemente de sucesso ou falha, reabilita o checkbox
        checkbox.disabled = false;
    }
}

/**
 * Verifica se o usuário está logado e carrega os dados iniciais.
 */
function checkAuthAndLoad() {
    // Pega os dados do usuário guardados pelo 'controller.js' (login)
    const userDataString = sessionStorage.getItem('user');
    
    if (!userDataString) {
        alert('Acesso negado. Por favor, faça o login.');
        window.location.href = 'index.html';
        return;
    }
    
    // Converte a string de volta para um objeto
    const userData = JSON.parse(userDataString);
    
    // 1. Manda o View renderizar o nome
    View.renderUserName(userData.name);
    
    // 2. Carrega as tarefas do usuário
    // Assumimos que o objeto 'userData' tem 'id' e 'role'
    if (userData.id && userData.role) {
        // Passa o ID e o Cargo para o loadTasks
        loadTasks(userData.role); 
    } else {
        View.setMainContentMessage('Erro: Dados do usuário (ID ou Cargo) não encontrados.');
    }
}

/**
 * Função de inicialização do controlador
 */
function init() {
    // 1. Carrega os dados
    checkAuthAndLoad();

    // 2. Ouve o clique no logout
    View.elements.logoutButton.addEventListener('click', handleLogout);

    // 3. LIGAÇÃO DE EVENTO (EVENT DELEGATION)
    // Ouve pelo evento 'change' no container <main>
    View.elements.mainContent.addEventListener('change', (event) => {
        // Filtra para garantir que o evento veio de um checkbox
        if (event.target.type === 'checkbox' && event.target.closest('.task-card')) {
            handleTaskStatusChange(event);
        }
    });
}

// Inicia o controlador
init();