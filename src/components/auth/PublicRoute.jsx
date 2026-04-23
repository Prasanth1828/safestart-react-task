import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
