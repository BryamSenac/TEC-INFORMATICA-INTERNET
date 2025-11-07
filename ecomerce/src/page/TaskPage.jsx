import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import TaskCard from '../components/TaskCard';
import AddCard from '../components/AddCard';
import TaskForm from '../components/TaskForm';
import { useTaskManager } from '../hooks/useTaskManager';
import { useAuthContext } from './../contexts/AuthContexts';

function TaskPage() {
    const { tasks, isFormOpen, editingTask, actions } = useTaskManager();
    const { logoutUser } = useAuthContext();

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px'
            }}>
                <h1 style={{ margin: 0, fontSize: '2rem' }}>
                    Tarefas
                </h1>

                <Button variant="outlined" color="error" onClick={logoutUser}>
                    Sair
                </Button>
            </Box>

            <Grid container spacing={3}>
                {tasks.map((task) => (
                    <Grid item key={task.id} xs={12} sm={6} md={3} lg={3}>
                        <TaskCard
                            task={task}
                            onEdit={() => actions.openEditForm(task)}
                            onDelete={() => actions.deleteTask(task.id)}
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
                    <TaskForm
                        onSave={actions.saveForm}
                        onCancel={actions.closeForm}
                        initialData={editingTask}
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default TaskPage;