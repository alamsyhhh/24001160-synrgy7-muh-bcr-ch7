import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import { AuthProvider } from './contexts/authContext';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
