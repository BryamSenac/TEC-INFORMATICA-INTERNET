// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('activepieces-form');
    const storyTopic = document.getElementById('story-topic');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const spinner = submitBtn.querySelector('.spinner');
    const alertMessage = document.getElementById('alert-message');

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const topic = storyTopic.value.trim();
        if (!topic) {
            showAlert('Por favor, informe sobre o que será a história.', 'error');
            return;
        }

        setLoading(true);
        hideAlert();

        try {
            const payload = {
                description: `crie uma historia complexa sobre... ${topic} e que tenha no maximo 500 caracteres`
            };

            // Substitua esta URL pelo Webhook do seu Activepieces
            const ACTIVEPIECES_WEBHOOK_URL = 'https://cloud.activepieces.com/api/v1/webhooks/zhhL8yRkP8zr3xyLtdua2';

            const response = await fetch(ACTIVEPIECES_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Falha no envio.');

            showAlert('Pedido enviado! A automação criará a sua história.', 'success');

            // Reset do form
            form.reset();

        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao enviar para o Activepieces.', 'error');
        } finally {
            setLoading(false);
        }
    });

    function showAlert(message, type) {
        alertMessage.textContent = message;
        alertMessage.className = `alert ${type}`;

        const icon = type === 'success' ? 'check-circle' : 'alert-circle';
        // Atualiza o innerHTML com o ícone e o texto
        alertMessage.innerHTML = `<i data-lucide="${icon}" style="width: 18px; height: 18px;"></i> ${message}`;
        // Re-renderiza os ícones do Lucide dentro do alerta
        lucide.createIcons();
    }

    function hideAlert() {
        alertMessage.className = 'alert hidden';
    }

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        if (isLoading) {
            btnText.classList.add('hidden');
            btnIcon.classList.add('hidden');
            spinner.classList.remove('hidden');
        } else {
            btnText.classList.remove('hidden');
            btnIcon.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    }
});
