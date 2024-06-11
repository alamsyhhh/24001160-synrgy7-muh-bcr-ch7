import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';

const PrivateRoute = () => {
  // Check if user is authenticated
  const isAuthenticatedUser = isAuthenticated();

  // Check if user has a token and role of admin or super admin
  const isAuthorized =
    isAuthenticatedUser &&
    isAuthenticatedUser.token &&
    (isAuthenticatedUser.user.role === 'admin' ||
      isAuthenticatedUser.user.role === 'super admin');

  // Redirect to signIn page if user is not authenticated or authorized
  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
