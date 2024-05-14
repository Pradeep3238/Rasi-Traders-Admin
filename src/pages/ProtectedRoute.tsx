import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    message.error('Please log in to view this page');
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
