import React from 'react';
import './../styles/authpage.css';
import LoginForm from './../components/auth_components/LoginForm';
import SignUpForm from './../components/auth_components/SignUpForm';
import { useAuth } from './../hooks/useAuth'; 
import { useAuthContext } from './../contexts/AuthContexts';
import { Navigate } from 'react-router-dom';

function AuthPage() {
  const { isAuthenticated } = useAuthContext();

  const {
    isLoginMode,
    formData,
    loading,
    error,
    toggleMode,
    handleChange,
    handleSubmit,
  } = useAuth(); 

  if (isAuthenticated) {
    return <Navigate to="/cards" replace />;
  }

  const formProps = {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLoginMode ? 'Login' : 'Criar Conta'}</h2>
        
        {isLoginMode ? (
          <LoginForm {...formProps} />
        ) : (
          <SignUpForm {...formProps} />
        )}

        <div className="toggle-mode">
          <button onClick={toggleMode} className="toggle-button" disabled={loading}>
            {isLoginMode
              ? 'Não tem uma conta? Cadastre-se'
              : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;