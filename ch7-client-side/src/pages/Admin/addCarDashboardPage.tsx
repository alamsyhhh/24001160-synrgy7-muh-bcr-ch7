import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
              'Cars',
              <Link to="/cardashboard">List Cars</Link>,
              'Add New Car',
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
