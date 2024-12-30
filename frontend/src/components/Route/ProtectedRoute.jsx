import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector(state => state.user);


  if (loading) return <Loader/>;


  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
