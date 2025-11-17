/**
 * 📁 view/view.js
 * * Responsável por ler e escrever no DOM.
 * Não contém lógica de negócio, apenas manipula os elementos da página.
 */

// 1. Exporta TODOS os elementos do DOM necessários
export const elements = {
    // Containers
    loginContainer: document.getElementById('login-container'),
    registerContainer: document.getElementById('register-container'),

    // Forms
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),

    // Links de Toggle
    showRegisterLink: document.getElementById('show-register'),
    showLoginLink: document.getElementById('show-login'),

    // Campos de Login
    loginEmail: document.getElementById('login-email'),
    loginPassword: document.getElementById('login-password'),
    loginButton: document.querySelector('#login-form .btn'),

    // Campos de Cadastro
    registerName: document.getElementById('register-name'),
    registerEmail: document.getElementById('register-email'),
    registerPassword: document.getElementById('register-password'),
    registerRole: document.getElementById('register-role'),
    registerButton: document.querySelector('#register-form .btn'),
};

// 2. Funções para alternar a visibilidade
export function showRegister() {
    elements.loginContainer.classList.add('hidden');
    elements.registerContainer.classList.remove('hidden');
}

export function showLogin() {
    elements.registerContainer.classList.add('hidden');
    elements.loginContainer.classList.remove('hidden');
}

// 3. Funções para obter dados dos formulários
export function getLoginData() {
    return {
        email: elements.loginEmail.value,
        password: elements.loginPassword.value,
    };
}

export function getRegisterData() {
    // Validação simples para o <select>
    if (!elements.registerRole.value) {
        throw new Error('Por favor, selecione um cargo.');
    }
    
    return {
        name: elements.registerName.value,
        email: elements.registerEmail.value,
        password: elements.registerPassword.value,
        role: elements.registerRole.value,
    };
}

// 4. Função de alerta
export function displayAlert(message) {
    // 'alert' é a forma mais simples, mas bloqueia a UI.
    // Em projetos maiores, podes querer criar um modal 
    // ou uma barra de notificação.
    alert(message);
}

// 5. Funções de 'loading' (mantidas como estavam)

/**
 * Controla o estado de "loading" do botão de login
 * @param {boolean} isLoading - True para mostrar loading, false para reverter
 */
export function setLoginLoading(isLoading) {
    if (isLoading) {
        elements.loginButton.disabled = true;
        elements.loginButton.textContent = 'Aguarde...';
    } else {
        elements.loginButton.disabled = false;
        elements.loginButton.textContent = 'Entrar';
    }
}

/**
 * Controla o estado de "loading" do botão de cadastro
 * @param {boolean} isLoading - True para mostrar loading, false para reverter
 */
export function setRegisterLoading(isLoading) {
    if (isLoading) {
        elements.registerButton.disabled = true;
        elements.registerButton.textContent = 'Aguardar...';
    } else {
        elements.registerButton.disabled = false;
        elements.registerButton.textContent = 'Cadastrar';
    }
}