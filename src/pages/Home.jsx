import React from 'react';
import { FoodContext } from '../context/Food';
import { PoopContext } from '../context/Poop';
import PoopList from '../components/PoopList';
import FoodList from '../components/FoodList';

const Home = () => {
  const { foods, loading: foodLoading } = React.useContext(FoodContext);
  const { poops, loading: poopLoading } = React.useContext(PoopContext);
  return (
    <div className="center-page">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      <h5 className="font-bold">Recent Poops</h5>
      <PoopList poops={poops.slice(0, 5)} onDelete={null} />
      <h5 className="font-bold">Recent Foods</h5>
      <FoodList foods={foods.slice(0, 5)} onDelete={null} />
      {/* TODO: Fetch and display summary from API */}
    </div>
  );
};

export default Home;
