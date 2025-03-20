import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = ({isAdmin}) => {
  const { isAuthenticated, loading,user } = useSelector(state => state.user);


  if (loading) return <Loader/>;

  if(isAdmin === true && user.role !== "admin"){
    return <Navigate to="/login" replace/>
  } 
 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
