import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

function FormCard({ onSave, onCancel, initialData }) {
    const [formData, setFormData] = useState({
        title: '',        
        price: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                price: initialData.price || '',
                imageUrl: initialData.imageUrl || '',
            });
        } else {
            setFormData({ imageUrl: '', title: '', price: '' });
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
        event.preventDefault();
        const dataToSave = {
            ...formData,
            price: parseFloat(formData.price) || 0,
        };
        onSave(dataToSave);
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
                backgroundColor: 'white'
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                    Novo Produto
                </Typography>
                <TextField
                    fullWidth
                    required
                    label="URL da Imagem"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    required
                    label="Título do Produto"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    required
                    label="Valor"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                />
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

export default FormCard;