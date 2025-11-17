/**
 * 📁 services/test.service.js
 * * SERVIÇO DE SIMULAÇÃO (MOCK)
 * * Versão 2: As tarefas agora são filtradas por CARGO (role).
 */

// Define um atraso de 500ms para simular a rede
const API_DELAY = 500;

// --- SIMULAÇÃO DE BANCO DE DADOS (localStorage) ---

function simulateApiCall(data, shouldFail = false, errorMessage = 'Erro simulado.') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(errorMessage));
            } else {
                resolve(data);
            }
        }, API_DELAY);
    });
}

function getMockUsers() {
    const users = localStorage.getItem('mock_users');
    if (users) {
        return JSON.parse(users);
    }
    
    // CORREÇÃO: Adicionados usuários para todos os cargos
    const defaultUsers = [
        { id: 1, name: 'Dev Teste', email: 'dev@teste.com', password: '123', role: 'DEV' },
        { id: 2, name: 'Design Teste', email: 'design@teste.com', password: '123', role: 'DESIGN' },
        { id: 3, name: 'Gerente Teste', email: 'gerente@teste.com', password: '123', role: 'GERENTE' },
        { id: 4, name: 'PO Teste', email: 'po@teste.com', password: '123', role: 'PO' },
        { id: 5, name: 'Mkt Teste', email: 'mkt@teste.com', password: '123', role: 'MARKETING' }
    ];
    saveMockUsers(defaultUsers);
    return defaultUsers;
}

function saveMockUsers(users) {
    localStorage.setItem('mock_users', JSON.stringify(users));
}

function getMockTasks() {
    const tasks = localStorage.getItem('mock_tasks');
    if (tasks) {
        return JSON.parse(tasks);
    }

    // --- CORREÇÃO: Base de dados de tarefas por CARGO ---
    const defaultTasks = [
        // DEV (3 tasks)
        { id: 101, title: 'Corrigir bug na API', description: 'O endpoint /login está a dar 500.', feito: false, role: 'DEV' },
        { id: 102, title: 'Refatorar o serviço de TAREFAS', description: 'O código está muito acoplado.', feito: false, role: 'DEV' },
        { id: 103, title: 'Implementar testes unitários', description: 'Cobrir o auth.service.', feito: true, role: 'DEV' },

        // DESIGN (3 tasks)
        { id: 201, title: 'Criar protótipo da v2', description: 'Fazer o fluxo de "Adicionar Tarefa" no Figma.', feito: false, role: 'DESIGN' },
        { id: 202, title: 'Ajustar paleta de cores', description: 'O header não está em conformidade.', feito: false, role: 'DESIGN' },
        { id: 203, title: 'Definir assets de ícones', description: 'Exportar os SVGs para a app.', feito: true, role: 'DESIGN' },
        
        // GERENTE (3 tasks)
        { id: 301, title: 'Rever o progresso da Sprint', description: 'Preparar a reunião de Sprint Review.', feito: false, role: 'GERENTE' },
        { id: 302, title: 'Analisar métricas de performance', description: 'Verificar o time-to-market das features.', feito: false, role: 'GERENTE' },
        { id: 303, title: 'Contratar novo Dev Jr.', description: 'Rever os currículos no portal.', feito: false, role: 'GERENTE' },

        // PO (Product Owner) (3 tasks)
        { id: 401, title: 'Priorizar o Backlog', description: 'Definir o que entra na próxima Sprint.', feito: false, role: 'PO' },
        { id: 402, title: 'Escrever User Story #55-B', description: 'A história do "Esqueci-me da senha".', feito: false, role: 'PO' },
        { id: 403, title: 'Validar a entrega de DESIGN', description: 'Ver se o protótipo do Figma está OK.', feito: true, role: 'PO' },

        // MARKETING (3 tasks)
        { id: 501, title: 'Preparar campanha de email', description: 'Anunciar a nova feature v2.', feito: false, role: 'MARKETING' },
        { id: 502, title: 'Analisar SEO da landing page', description: 'Verificar palavras-chave.', feito: false, role: 'MARKETING' },
        { id: 503, title: 'Agendar posts nas redes sociais', description: 'Falar sobre o case study do cliente X.', feito: false, role: 'MARKETING' }
    ];
    // ----------------------------------------------------

    saveMockTasks(defaultTasks);
    return defaultTasks;
}

function saveMockTasks(tasks) {
    localStorage.setItem('mock_tasks', JSON.stringify(tasks));
}

// Inicializa o banco de dados de simulação
getMockUsers();
getMockTasks();


// --- FUNÇÕES EXPORTADAS (Simulando auth.service.js) ---
// (Sem alterações aqui - register, login, logout continuam iguais)

export async function register(name, email, password, role) {
    const users = getMockUsers();
    
    if (users.some(user => user.email === email)) {
        return simulateApiCall(
            null, 
            true,
            'Este email já está cadastrado.'
        );
    }
    
    const newUser = {
        id: Date.now(), 
        name,
        email,
        password,
        role
    };
    
    users.push(newUser);
    saveMockUsers(users);
    
    const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    };
    
    return simulateApiCall(userData);
}

export async function login(email, password) {
    const users = getMockUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return simulateApiCall(
            null, 
            true,
            'Email não encontrado.'
        );
    }
    
    if (user.password !== password) {
        return simulateApiCall(
            null,
            true,
            'Senha incorreta.'
        );
    }
    
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    
    return simulateApiCall(userData);
}

export async function logout() {
    return simulateApiCall({ success: true });
}


// --- FUNÇÕES EXPORTADAS (Simulando task.service.js) ---

/**
 * Simula a busca de tarefas por CARGO.
 * @param {string} role - O cargo do usuário (ex: "DEV")
 */
export async function getAllTasks(role) { // <-- MUDANÇA AQUI
    const allTasks = getMockTasks();
    
    // Filtra as tarefas pelo CARGO (role)
    const userTasks = allTasks.filter(task => task.role === role);
    
    return simulateApiCall(userTasks);
}

/**
 * Simula a atualização do status de uma tarefa.
 * (Sem alterações, continua a funcionar por taskId)
 */
export async function updateTaskStatus(taskId, isCompleted) {
    const allTasks = getMockTasks();
    
    const taskIndex = allTasks.findIndex(task => task.id == taskId);
    
    if (taskIndex === -1) {
        return simulateApiCall(
            null,
            true,
            'Tarefa não encontrada.'
        );
    }
    
    allTasks[taskIndex].feito = isCompleted;
    saveMockTasks(allTasks);
    
    return simulateApiCall({ success: true });
}