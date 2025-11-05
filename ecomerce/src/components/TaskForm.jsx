import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem'; // Importado

// Status das tarefas
const statuses = ['To Do', 'In Progress', 'Done'];

function TaskForm({ onSave, onCancel, initialData }) {
    const [formData, setFormData] = useState({
        title: '',        
        description: '',
        status: 'To Do',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                status: initialData.status || 'To Do',
            });
        } else {
            // Reset para nova tarefa
            setFormData({ title: '', description: '', status: 'To Do' });
        }
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        console.log(formData)
        event.preventDefault();
        onSave(formData); // Salva o formData
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: 'white',
                minWidth: '400px' // Garante espaço para o formulário
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                    {initialData ? 'Editar Tarefa' : 'Nova Tarefa'}
                </Typography>
                <TextField
                    fullWidth
                    required
                    label="Título da Tarefa"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Descrição"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                <TextField
                    fullWidth
                    required
                    select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    {statuses.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ pt: 1 }}>
                    <Button variant="outlined" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button variant="contained" type="submit">
                        Salvar
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default TaskForm;