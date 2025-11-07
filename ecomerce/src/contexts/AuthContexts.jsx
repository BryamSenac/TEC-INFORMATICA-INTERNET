import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(null);

  const loginUser = (access) => {
    setAccess(access);
  };

  const logoutUser = () => {
    setAccess(null);
  };

  const value = {
    access,
    loginUser,
    logoutUser,
    isAuthenticated: !!access,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};