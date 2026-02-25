import { useState } from 'react';
import { authService } from './../services/auth_service';

export const useAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setFormData({ name: '', email: '', password: '' });
    setError('');
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isLoginMode) {
        await authService.login(formData);
      } else {
        const { session } = await authService.register(formData);
        if (!session) {
          setMessage('Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.');
        }
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoginMode,
    formData,
    loading,
    error,
    message,
    toggleMode,
    handleChange,
    handleSubmit,
  };
};