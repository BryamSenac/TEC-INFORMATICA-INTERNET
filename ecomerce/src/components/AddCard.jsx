import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';

function AddCard({ handleClick }) {
  return (
    <Card
      sx={{
        width: '250px',
        height: '220px', // Altura ajustada para combinar com o TaskCard
        boxShadow: 'none'
      }}
    >
      <CardActionArea
        onClick={() => {          
          handleClick();                  
        }}
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed',
          borderColor: 'grey.400',
          color: 'grey.600',
          '&:hover': {
            backgroundColor: 'grey.100',
            borderColor: 'grey.600',
          },
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <AddIcon sx={{ fontSize: 48 }} />
        </Box>
      </CardActionArea>
    </Card >
  );
}

export default AddCard;