import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If the user is not logged in, redirect them to the login page safely
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the protected component (like the Admin Dashboard)
  return children;
}