import React from 'react';
import LogoutButton from '../components/LogoutButton';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="center-page">
      <h1>Dashboard</h1>
      <p>Welcome to PoopJournal! Here you will see a summary of your recent foods and poops.</p>
      {/* TODO: Fetch and display summary from API */}
    </div>
  );
};

export default Home;
