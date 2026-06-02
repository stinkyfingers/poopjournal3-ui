import React from 'react';
import { Show, SignInButton, SignUpButton } from '@clerk/react'

const RequireAuth = ({ children }) => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <Show when="signed-out">
        <div className="text-center">Please log in or sign up to access this page.</div>
      </Show>
      <Show when="signed-in">
        {children}
      </Show>
    </div>
  );
};

export default RequireAuth;
