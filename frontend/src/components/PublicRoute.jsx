import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



// This component prevents logged-in users from seeing Login/Register
const PublicRoute = ({ children }) => {
  const { authUser, isLoading } = useAuth();

  //   Wait for AuthContext to finish checking the session
  if (isLoading) return <div className="p-20 text-center">Loading...</div>;

  //  If user is logged in, redirect them away from guest pages
  if (authUser) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default PublicRoute;