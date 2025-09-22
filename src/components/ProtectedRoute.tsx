import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      // No token found, redirect to login
      navigate('/signin', { replace: true });
    }
  }, [navigate]);

  // Only render children if token exists
  const token = sessionStorage.getItem('token');
  if (!token) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}