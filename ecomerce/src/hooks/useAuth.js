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

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setFormData({ name: '', email: '', password: '' });
    setError('');
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
    setLoading(true);

    try {
      if (isLoginMode) {
        const { user, token } = await authService.login(formData);
        console.log('Login bem-sucedido!', user, token);
        
      } else {
        const { user, token } = await authService.register(formData);
        console.log('Cadastro bem-sucedido!', user, token);
        
        alert('Cadastro realizado com sucesso! Faça seu login.');
        setIsLoginMode(true); 
        setFormData({ name: '', email: '', password: '' });
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
    toggleMode,
    handleChange,
    handleSubmit,
  };
};