import { useState } from 'react';
import { authService } from './../services/auth_service';
import { useAuthContext } from './../contexts/AuthContexts';

export const useAuth = () => {
  const { loginUser } = useAuthContext();

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
        const access = await authService.login(formData);
        loginUser(access);
      } else {
        const access = await authService.register(formData);
        loginUser(access);
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