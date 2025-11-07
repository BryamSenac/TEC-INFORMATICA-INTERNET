const API_URL = 'http://localhost:3000/cards';

const getAuthHeaders = (hasBody = false) => {
  const token = localStorage.getItem('authToken');
  
  const headers = new Headers();
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
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
      });
      if (!response.ok) {
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
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
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
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
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
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar tarefa.');
      }
    } catch (error) {
      console.error("Falha em deleteTask:", error);
      throw error;
    }
  },
};

export default taskService;