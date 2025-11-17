import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from './auth_service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await authService.checkAuthStatus();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const loginUser = async (email, password) => {
    try {
      await authService.login({ email, password });
      setIsAuthenticated(true); 
    } catch (error) {
      console.error("Erro no loginUser (Context):", error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Erro no logoutUser (Context):", error);
    } finally {
      setIsAuthenticated(false);
    }
  };
  
  const value = {
    isAuthenticated,
    loginUser,
    logoutUser,
    isLoading,
  };

  if (isLoading) {
    return <div>A verificar autenticação...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};