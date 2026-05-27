import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Food from './pages/Food';
import Poop from './pages/Poop';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RequireAuth from './components/RequireAuth';

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
    <Route path="/food" element={<RequireAuth><Food /></RequireAuth>} />
    <Route path="/poop" element={<RequireAuth><Poop /></RequireAuth>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
