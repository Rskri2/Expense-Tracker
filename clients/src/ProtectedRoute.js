import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const authValue = localStorage.getItem('authenticated');
  const isAuthenticated = authValue === 'true'; 

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
