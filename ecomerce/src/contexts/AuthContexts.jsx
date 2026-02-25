import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from './../services/auth_service';
import { supabase } from './../services/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginUser = async (email, password) => {
    try {
      await authService.login({ email, password });
      // State update handled by onAuthStateChange
    } catch (error) {
      console.error("Erro no loginUser (Context):", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await authService.logout();
      // State update handled by onAuthStateChange
    } catch (error) {
      console.error("Erro no logoutUser (Context):", error);
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