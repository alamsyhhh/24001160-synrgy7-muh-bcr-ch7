import React from 'react';
import Dashboard from '../../section/Admin/dashboardSection';

const DashboardPage: React.FC = () => {
  return (
    <Dashboard activePage="dashboard" content={<h4>Dashboard Components</h4>} />
  );
};

export default DashboardPage;
