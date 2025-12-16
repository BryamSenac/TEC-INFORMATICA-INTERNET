/**
 * 📁 controller/controller.js
 * * O "cérebro" da página de autenticação.
 * Ouve os eventos do utilizador (cliques, submits),
 * chama o `AuthService` para fazer a lógica de API,
 * e usa a `View` para atualizar a página.
 */

import * as View from '../view/view.js';
import * as AuthService from '../services/auth.service.js';
//Arquivo de teste basta trocar os importes de serviço por esse para testar
// import * as AuthService from '../services/test.service.js';

/**
 * Guarda os dados do utilizador no sessionStorage e redireciona.
 * Esta função é chamada tanto pelo login como pelo cadastro.
 */
function handleAuthSuccess(userData) {
    // 1. Guarda os dados do utilizador (como string) no sessionStorage
    //    A nova página 'tarefas.html' vai ler isto para saber o nome.
    sessionStorage.setItem('user', JSON.stringify(userData));
    
    // 2. Redireciona o navegador para a nova página
    window.location.href = 'tarefas.html';
}

/**
 * Orquestra o processo de login.
 */
async function handleLogin() {
    View.setLoginLoading(true); 
    try {
        const data = View.getLoginData();
        const userData = await AuthService.login(data.email, data.password);
        
        // Se a API correu bem, o cookie HttpOnly foi definido
        // e recebemos os dados do utilizador.
        handleAuthSuccess(userData);

    } catch (error) {
        // O AuthService.login vai lançar um erro se a API falhar,
        // e o handleResponse vai extrair a mensagem de erro da API.
        View.displayAlert(`Erro no login: ${error.message}`);
    } finally {
        // Ocorre sempre, quer dê sucesso ou erro, 
        // para reativar o botão.
        View.setLoginLoading(false);
    }
}

/**
 * Orquestra o processo de cadastro.
 */
async function handleRegister() {
    View.setRegisterLoading(true);
    try {
        const data = View.getRegisterData();
        const newUserData = await AuthService.register(
            data.name, 
            data.email, 
            data.password, 
            data.role
        );
        
        // Assumindo que a API de cadastro também loga o utilizador
        // (define o cookie) e retorna os dados do novo utilizador.
        handleAuthSuccess(newUserData);

    } catch (error) {
        View.displayAlert(`Erro no cadastro: ${error.message}`);
    } finally {
        View.setRegisterLoading(false);
    }
}

/**
 * Função principal que inicializa a página.
 * Adiciona todos os "ouvintes" de eventos.
 */
function init() {
    // Listener para o link "Cadastre-se"
    View.elements.showRegisterLink.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o link de navegar (mudar a URL)
        View.showRegister();
    });

    // Listener para o link "Faça login"
    View.elements.showLoginLink.addEventListener('click', (event) => {
        event.preventDefault();
        View.showLogin();
    });

    // Listener para o submit do formulário de login
    View.elements.loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o formulário de recarregar a página
        handleLogin();
    });

    // Listener para o submit do formulário de cadastro
    View.elements.registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleRegister();
    });
}

// Inicia a aplicação assim que o JS é carregado
init();