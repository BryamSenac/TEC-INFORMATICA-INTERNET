const API_URL = 'http://localhost:3000/products';

const productService = {
    
    async getAllProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos.');
            }
            return await response.json();
        } catch (error) {
            console.error("Falha em getAllProducts:", error);
            throw error;
        }
    },

    async createProduct(productData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            if (!response.ok) {
                throw new Error('Erro ao criar produto.');
            }
            return await response.json();
        } catch (error) {
            console.error("Falha em createProduct:", error);
            throw error;
        }
    },

    async updateProduct(id, productData) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar produto.');
            }
            return await response.json();
        } catch (error) {
            console.error("Falha em updateProduct:", error);
            throw error;
        }
    },

    async deleteProduct(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar produto.');
            }
        } catch (error) {
            console.error("Falha em deleteProduct:", error);
            throw error;
        }
    },
};

export default productService;