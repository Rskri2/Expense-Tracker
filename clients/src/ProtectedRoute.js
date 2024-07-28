import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const authValue = window.localStorage.getItem('authenticated');
  return authValue === "true" ? <Outlet/> : <Navigate to="/" />;
}
