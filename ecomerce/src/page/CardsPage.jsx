import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import ProductCard from './../components/ProductCard';
import AddCard from './../components/AddCard';
import FormCard from './../components/Form';
import { useCardManager } from './../hooks/useCards';

function CardPage() {
    const { cards, isFormOpen, editingCard, actions } = useCardManager();

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Produtos</h1>
            
            <Grid container spacing={3}>
                {cards.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={3} lg={3}>
                        <ProductCard 
                            product={product}
                            onEdit={() => actions.openEditForm(product)}
                            onDelete={() => actions.deleteCard(product.id)}
                        />
                    </Grid>
                ))}
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AddCard handleClick={actions.openAddForm} /> 
                </Grid>
            </Grid>
            <Dialog open={isFormOpen} onClose={actions.closeForm}>
                <DialogTitle>{editingCard ? 'Editar Produto' : 'Adicionar Novo Produto'}</DialogTitle>
                <DialogContent>
                    <FormCard 
                        onSave={actions.saveForm}
                        onCancel={actions.closeForm}
                        initialData={editingCard}
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default CardPage;