import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // If loading, show nothing
  if (loading) return null;

  // If not logged in, redirect to home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in, show the protected content
  return children;
}
