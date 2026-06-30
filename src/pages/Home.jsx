import React from 'react';
import { UserDataContext } from '../context/UserData';
import PoopList from '../components/PoopList';
import FoodList from '../components/FoodList';

const Home = () => {
  const { foods, poops, loading } = React.useContext(UserDataContext);
  return (
    <div className="center-page">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      { poops?.length > 0 &&
      <>
        <h5 className="font-bold">Recent Poops</h5>
        <PoopList poops={poops.slice(0, 5)} onDelete={null} />
      </>
      }
      { foods?.length > 0 && 
      <>
        <h5 className="font-bold">Recent Foods</h5>
        <FoodList foods={foods.slice(0, 5)} onDelete={null} />
      </>
      }
    </div>
  );
};

export default Home;
