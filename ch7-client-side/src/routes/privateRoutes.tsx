import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateRoute;
