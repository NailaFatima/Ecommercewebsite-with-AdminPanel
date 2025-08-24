import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Spinner } from 'react-bootstrap';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, permission }) => {
  const { state, hasPermission } = useAdminAuth();
  const location = useLocation();

  if (state.isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (permission && !hasPermission(permission)) {
    return (
      <div className="text-center py-5">
        <h3>Access Denied</h3>
        <p className="text-muted">You don't have permission to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;