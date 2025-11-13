import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminProtectedRoute = () => {
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
  return adminInfo ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

