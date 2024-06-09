import React from 'react';
import '../../index.css';
import AuthForm from '../../section/Admin/authSection';

const SignIpPage: React.FC = () => {
  return (
    <>
      <AuthForm isSignUp={false} />
    </>
  );
};

export default SignIpPage;
