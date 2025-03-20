import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUserRole } from '../services/AuthService';

const PrivateRoute = ({ element, roles }) => {
  const userRole = getCurrentUserRole();

  if (!userRole || !roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;