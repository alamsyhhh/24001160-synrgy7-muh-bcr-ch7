import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/formInput';
import { useAuth } from '../../hooks/useSignIn';
import { useRegister } from '../../hooks/useSignUp';

interface AuthFormProps {
  isSignUp: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const {
    login,
    loading: loginLoading,
    error: loginError,
    success: loginSuccess,
    setSuccess: setLoginSuccess,
  } = useAuth();
  const {
    register,
    loading: registerLoading,
    error: registerError,
    success: registerSuccess,
    setError: setRegisterError,
    setSuccess: setRegisterSuccess,
  } = useRegister();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      const userRole = JSON.parse(localStorage.getItem('user')!).role;
      if (userRole === 'member') {
        navigate('/');
      } else {
        navigate('/dashboard');
      }
      setLoginSuccess(false);
    }
  }, [loginSuccess, navigate, setLoginSuccess]);

  useEffect(() => {
    if (registerSuccess) {
      navigate('/signIn');
      setRegisterSuccess(false);
    }
  }, [registerSuccess, navigate, setRegisterSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      if (password !== confirmPassword) {
        setRegisterError('Passwords do not match!');
        return;
      }
      await register(username, email, password);
    } else {
      await login(email, password);
    }
  };

  const loading = isSignUp ? registerLoading : loginLoading;
  const error = isSignUp ? registerError : loginError;

  return (
    <div className="container-grid">
      <div className="image-section">
        <img src="img/dashboard.png" alt="Dashboard" />
      </div>
      <div className="form-section">
        <div className="form-container position-relative">
          {loading && (
            <div className="position-absolute top-50 start-50 translate-middle">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <form id="form-auth" className="p-4 p-md-5" onSubmit={handleSubmit}>
            <img src="img/Rectangle62.png" alt="Logo" />
            <h2 className="mb-3 w-100">
              {isSignUp ? 'Sign Up to BCR' : 'Welcome to BCR'}
            </h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {isSignUp && (
              <FormInput
                id="usernameInput"
                label="Username"
                type="text"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <FormInput
              id="emailInput"
              label="Email"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              id="passwordInput"
              label="Password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <FormInput
                id="confirmPasswordInput"
                label="Confirm Password"
                type="password"
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            <hr className="my-4" />
            <p>
              {isSignUp ? (
                <>
                  Already have an account? <Link to="/signIn">Sign In</Link>
                </>
              ) : (
                <>
                  Don't have an account? <Link to="/signUp">Sign Up</Link>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
