import { useState, useEffect } from 'react';
import productService from './../services/products_services';

export function useCardManager() {
    const [cards, setCards] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await productService.getAllProducts();
                setCards(products);
            } catch (error) {
                console.error("Não foi possível carregar os produtos.");
            }
        };
        fetchProducts();
    }, []);

    const handleOpenAddForm = () => {
        setEditingCard(null);
        setIsFormOpen(true);
    };

    const handleOpenEditForm = (product) => {
        setEditingCard(product);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSaveForm = async (formData) => {
        try {
            if (editingCard) {
                const updatedProduct = await productService.updateProduct(editingCard.id, formData);
                setCards(prevCards =>
                    prevCards.map(card =>
                        card.id === editingCard.id ? updatedProduct : card
                    )
                );
            } else {
                const newProduct = await productService.createProduct(formData);
                setCards(prevCards => [...prevCards, newProduct]);
            }
            alert('Salvo!');
            handleCloseForm();
        } catch (error) {
            alert('Falha ao salvar o produto.');
        }
    };

    const handleDeleteCard = async (productId) => {
        if (window.confirm('Tem certeza que deseja deletar este produto?')) {
            try {
                await productService.deleteProduct(productId);
                setCards(prevCards => prevCards.filter(card => card.id !== productId));
            } catch (error) {
                alert('Falha ao deletar o produto.');
            }
        }
    };

    return {
        cards,
        isFormOpen,
        editingCard,
        actions: {
            openAddForm: handleOpenAddForm,
            openEditForm: handleOpenEditForm,
            closeForm: handleCloseForm,
            saveForm: handleSaveForm,
            deleteCard: handleDeleteCard,
        },
    };
}