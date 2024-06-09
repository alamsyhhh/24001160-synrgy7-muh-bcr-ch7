import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../../section/Admin/dashboardSection';
import FormAddComponent from '../../components/Admin/formAddComponent';
import Breadcrumb from '../../components/Admin/breadcrumbComponent';

const CreateCarPage: React.FC = () => {
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
