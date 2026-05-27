import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../components/Button';

const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <div>You are already logged in.</div>;

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={() => loginWithRedirect()}>Log In with Auth0</Button>
    </div>
  );
};

export default Login;
