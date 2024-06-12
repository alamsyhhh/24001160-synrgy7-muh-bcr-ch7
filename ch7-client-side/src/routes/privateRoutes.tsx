import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';

const PrivateRoute = () => {
  const isAuthenticatedUser = isAuthenticated();

  const isAuthorized =
    isAuthenticatedUser &&
    isAuthenticatedUser.token &&
    (isAuthenticatedUser.user.role === 'admin' ||
      isAuthenticatedUser.user.role === 'super admin');

  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
