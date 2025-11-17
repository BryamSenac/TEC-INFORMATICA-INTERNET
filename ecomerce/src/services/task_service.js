const API_URL = 'http://localhost:3000/cards';

const getAuthHeaders = (hasBody = false) => {
  const headers = new Headers();

  if (hasBody) {
    headers.append('Content-Type', 'application/json');
  }

  return headers;
};

const taskService = {

  async getAllTasks() {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: getAuthHeaders(false),
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Não autorizado. Faça login novamente.');
        }
        throw new Error('Erro ao buscar tarefas.');
      }
      return await response.json();
    } catch (error) {
      console.error("Falha em getAllTasks:", error);
      throw error;
    }
  },

  async createTask(taskData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(true),
        credentials: 'include',
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        if (response.status === 401) throw new Error('Não autorizado.');
        throw new Error('Erro ao criar tarefa.');
      }
      return await response.json();
    } catch (error) {
      console.error("Falha em createTask:", error);
      throw error;
    }
  },

  async updateTask(id, taskData) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(true),
        credentials: 'include',
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        if (response.status === 401) throw new Error('Não autorizado.');
        throw new Error('Erro ao atualizar tarefa.');
      }
      return await response.json();
    } catch (error) {
      console.error("Falha em updateTask:", error);
      throw error;
    }
  },

  async deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(false),
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 401) throw new Error('Não autorizado.');
        throw new Error('Erro ao deletar tarefa.');
      }
      return true;
    } catch (error) {
      console.error("Falha em deleteTask:", error);
      throw error;
    }
  },
};

export default taskService;