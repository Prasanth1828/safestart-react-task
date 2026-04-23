import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
