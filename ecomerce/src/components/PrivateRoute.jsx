import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './../contexts/AuthContexts';


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default PrivateRoute;