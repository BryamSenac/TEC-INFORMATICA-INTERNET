import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip'; // Importado
import Box from '@mui/material/Box';

// Função helper para definir a cor do Chip com base no status
const getStatusColor = (status) => {
  switch (status) {
    case 'To Do':
      return 'default';
    case 'In Progress':
      return 'primary';
    case 'Done':
      return 'success';
    default:
      return 'default';
  }
};

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <Card sx={{ 
        width: '250px', 
        minHeight: '220px', // Altura mínima
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between' // Garante que as ações fiquem na parte inferior
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: '60px' }}>
          {task.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
           <Chip 
              label={task.status} 
              color={getStatusColor(task.status)} 
              size="small" 
           />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton aria-label="editar" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="deletar" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default TaskCard;