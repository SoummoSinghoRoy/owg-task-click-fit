import React from 'react';
import { Navigate } from 'react-router-dom';

const NotProtectedRoute = ({children}) => {
  const authorized = localStorage.getItem('authorization');
  if(authorized !== 'true') {
    return children
  }
  return <Navigate to='/'/>
}

export default NotProtectedRoute;