import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landingPage';
import FindingCarPage from '../pages/findCarPage';
import SignInPage from '../pages/Auth/signInPage';
import SignUpPage from '../pages/Auth/signUpPage';
import PrivateRoute from './privateRoutes';
import DashboardPage from '../pages/Admin/dashboardPage';
import CarDashboardPage from '../pages/Admin/carsDashboardPage';
import CreateCarPage from '../pages/Admin/addCarDashboardPage';
import UpdateCarPage from '../pages/Admin/updateCarDashboard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cars" element={<FindingCarPage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/signUp" element={<SignUpPage />} />

      {/* Gunakan PrivateRoute sebagai route parent */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/cardashboard" element={<CarDashboardPage />} />
        <Route path="/addcardashboard" element={<CreateCarPage />} />
        <Route path="/updatecardashboard" element={<UpdateCarPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
