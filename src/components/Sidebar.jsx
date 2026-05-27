import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import '../css/Sidebar.css';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const Sidebar = () => (
  <nav className="sidebar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/food">Food</Link></li>
      <li><Link to="/poop">Poop</Link></li>
    </ul>
    <div className="sidebar-logout">
      <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
    </div>
  </nav>
);

export default Sidebar;
