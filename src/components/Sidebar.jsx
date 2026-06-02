import React from 'react';
import { Link } from 'react-router-dom';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const Sidebar = () => (
  <nav className="flex flex-col gap-2 px-6 py-3 bg-slate-300">
    <ul className="space-y-2">
      <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
      <li><Link to="/food" className="hover:text-blue-500">Food</Link></li>
      <li><Link to="/poop" className="hover:text-blue-500">Poop</Link></li>
    </ul>
    <div className="sidebar-logout mt-auto">
      <Show when="signed-out">
        <SignInButton className="m-2 hover:text-blue-500" />
        <SignUpButton className="m-2 hover:text-blue-500" />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  </nav>
);

export default Sidebar;
