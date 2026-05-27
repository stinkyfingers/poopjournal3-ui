import React from 'react';
import { Show, SignInButton, SignUpButton } from '@clerk/react'

const RequireAuth = ({ children }) => {
  return (
    <>
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        {children}
      </Show>
    </>
  );
};

export default RequireAuth;
