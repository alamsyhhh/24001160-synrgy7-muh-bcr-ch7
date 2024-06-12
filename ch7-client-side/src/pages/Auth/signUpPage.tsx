import React from 'react';
import '../../index.css';
import AuthForm from '../../section/Admin/authSection';

const SignUpPage: React.FC = () => {
  return (
    <>
      <AuthForm isSignUp={true} />
    </>
  );
};

export default SignUpPage;
