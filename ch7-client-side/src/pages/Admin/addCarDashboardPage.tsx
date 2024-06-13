import React, { useEffect } from 'react';
import Dashboard from '../../section/Admin/dashboardSection';
import FormAddComponent from '../../components/Admin/formAddComponent';
import Breadcrumb from '../../components/Admin/breadcrumbComponent';
import feather from 'feather-icons';

const CreateCarPage: React.FC = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <Dashboard
      activePage="cars"
      content={
        <>
          <Breadcrumb
            breadcrumbs={[
              { label: 'Cars', path: '/cardashboard' },
              { label: 'List Cars', path: '/cardashboard' },
              { label: 'Add New Car', path: '' },
            ]}
          />
          <h4>Add New Car</h4>
          <FormAddComponent />
        </>
      }
    />
  );
};

export default CreateCarPage;
