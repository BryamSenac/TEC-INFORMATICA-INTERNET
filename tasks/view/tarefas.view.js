/**
 * 📁 view/tarefas.view.js
 * * View da tela principal de tarefas.
 * Responsável por ler e escrever no DOM.
 */

// 1. Exporta os elementos do DOM
export const elements = {
    // Elementos do <header>
    userNameSpan: document.getElementById('user-name'),
    logoutButton: document.getElementById('logout-button'),
    
    // O container <main> onde as tarefas entram
    mainContent: document.querySelector('main')
};

/**
 * Exibe o nome do usuário no cabeçalho.
 * @param {string} name - O nome do usuário (ex: "Ana")
 */
export function renderUserName(name) {
    if (name) {
        elements.userNameSpan.textContent = `Olá, ${name}`;
    } else {
        elements.userNameSpan.textContent = 'Visitante';
    }
}

/**
 * Retorna a classe CSS correta com base no cargo do usuário.
 * @param {string} role - O cargo (ex: "DEV", "DESIGN")
 * @returns {string} - A classe CSS (ex: "border-DEV")
 */
function getRoleBorderClass(role) {
    // Lista de cargos válidos para evitar classes inválidas
    const validRoles = ['DEV', 'DESIGN', 'GERENTE', 'PO', 'MARKETING'];
    
    if (validRoles.includes(role)) {
        return `border-${role}`;
    }
    return ''; // Retorna nada se o cargo não for reconhecido
}

/**
 * Renderiza a lista de tarefas na tela.
 * @param {Array} tasks - A lista de tarefas vinda da API.
 * @param {string} userRole - O cargo do usuário logado (ex: "DEV").
 */
export function renderTasks(tasks, userRole) {
    elements.mainContent.innerHTML = ''; // Limpa o conteúdo atual

    if (!tasks || tasks.length === 0) {
        elements.mainContent.innerHTML = '<p>Você ainda não tem tarefas cadastradas.</p>';
        return;
    }

    tasks.forEach(task => {
        // Assumimos que a tarefa tem: id, title, description, e 'feito'
        
        const card = document.createElement('article');
        card.className = 'task-card';
        // Guarda o ID da tarefa no 'dataset' para o controller usar
        card.dataset.taskId = task.id; 

        // --- CORREÇÃO DE LÓGICA VISUAL ---
        
        // 1. A borda de cargo é aplicada SEMPRE.
        card.classList.add(getRoleBorderClass(userRole));
        
        // 2. Se a tarefa estiver 'feito', adiciona a classe
        //    para o CSS aplicar os estilos de 'concluída'.
        if (task.feito === true) {
            card.classList.add('task-completed');
        }
        // ---------------------------------

        // Define o 'checked' do checkbox com base em 'task.feito'
        card.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <div class="task-status">
                <input 
                    type="checkbox" 
                    id="task-${task.id}" 
                    ${task.feito ? 'checked' : ''} 
                >
                <label for="task-${task.id}">Concluída</label>
            </div>
        `;

        elements.mainContent.appendChild(card);
    });
}

/**
 * Mostra uma mensagem de erro ou "carregando" na <main>
 * @param {string} message - A mensagem a ser exibida.
 */
export function setMainContentMessage(message) {
    elements.mainContent.innerHTML = `<p>${message}</p>`;
}