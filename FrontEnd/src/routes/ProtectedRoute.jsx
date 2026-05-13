import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export function ProtectedRoute({ children, roleRequired }) {
  const { signed, user, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  if (!signed) return <Navigate to="/login" />;

  if (roleRequired && user.perfil !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
}