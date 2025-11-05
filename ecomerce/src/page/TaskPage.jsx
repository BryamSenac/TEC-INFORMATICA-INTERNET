import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import TaskCard from '../components/TaskCard'; // Renomeado
import AddCard from '../components/AddCard';
import TaskForm from '../components/TaskForm'; // Renomeado
import { useTaskManager } from '../hooks/useTaskManager'; // Renomeado

function TaskPage() {
    const { tasks, isFormOpen, editingTask, actions } = useTaskManager(); // Renomeado

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Tarefas</h1> 
            
            <Grid container spacing={3}>
                {tasks.map((task) => ( // Renomeado
                    <Grid item key={task.id} xs={12} sm={6} md={3} lg={3}>
                        <TaskCard // Renomeado
                            task={task} // Renomeado
                            onEdit={() => actions.openEditForm(task)} // Renomeado
                            onDelete={() => actions.deleteTask(task.id)} // Renomeado
                        />
                    </Grid>
                ))}
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AddCard handleClick={actions.openAddForm} /> 
                </Grid>
            </Grid>
            <Dialog open={isFormOpen} onClose={actions.closeForm}>
                <DialogTitle>{editingTask ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}</DialogTitle>
                <DialogContent>
                    <TaskForm // Renomeado
                        onSave={actions.saveForm}
                        onCancel={actions.closeForm}
                        initialData={editingTask} // Renomeado
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default TaskPage;