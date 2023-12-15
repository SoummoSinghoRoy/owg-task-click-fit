import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const authorized = localStorage.getItem('authorization');
  if(authorized === 'true') {
    return children
  }
  return <Navigate to='/login'/>
}

export default ProtectedRoute;