import { useState, useEffect } from 'react';
import taskService from '../services/task_service'; // Atualizado

export function useTaskManager() {
    const [tasks, setTasks] = useState([]); // Renomeado
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // Renomeado

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await taskService.getAllTasks(); // Atualizado
                setTasks(tasks); // Atualizado
            } catch (error) {
                console.error("Não foi possível carregar as tarefas.");
            }
        };
        fetchTasks();
    }, []);

    const handleOpenAddForm = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const handleOpenEditForm = (task) => { // Renomeado
        setEditingTask(task); // Renomeado
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSaveForm = async (formData) => {
        try {
            if (editingTask) { // Renomeado
                const updatedTask = await taskService.updateTask(editingTask.id, formData); // Atualizado
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === editingTask.id ? updatedTask : task
                    )
                );
            } else {
                const newTask = await taskService.createTask(formData); // Atualizado
                setTasks(prevTasks => [...prevTasks, newTask]);
            }
            alert('Tarefa salva!'); // Atualizado
            handleCloseForm();
        } catch (error) {
            alert('Falha ao salvar a tarefa.'); // Atualizado
        }
    };

    const handleDeleteTask = async (taskId) => { // Renomeado
        if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) { // Atualizado
            try {
                await taskService.deleteTask(taskId); // Atualizado
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            } catch (error) {
                alert('Falha ao deletar a tarefa.'); // Atualizado
            }
        }
    };

    return {
        tasks, // Renomeado
        isFormOpen,
        editingTask, // Renomeado
        actions: {
            openAddForm: handleOpenAddForm,
            openEditForm: handleOpenEditForm,
            closeForm: handleCloseForm,
            saveForm: handleSaveForm,
            deleteTask: handleDeleteTask, // Renomeado
        },
    };
}