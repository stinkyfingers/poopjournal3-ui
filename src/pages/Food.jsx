import React from 'react';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import { UserDataContext } from '../context/UserData';
import { useAuth } from '@clerk/react'
import { API_BASE } from '../config';


const Food = () => {
  const { foods, loading, onRefresh } = React.useContext(UserDataContext);
  const { getToken } = useAuth();

  const handleAdd = async (food) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/food`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(food),
      });
      await res.json();
      onRefresh();
    } catch (error) {
      console.error('Failed to add food entry', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      await fetch(`${API_BASE}/food?id=${id}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      onRefresh();
    } catch (error) {
      console.error('Failed to delete food entry', error);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Food</h1>
      <FoodForm onAdd={handleAdd} />
      {loading ? <p>Loading...</p> : <FoodList foods={foods} onDelete={handleDelete} />}
    </div>
  );
};

export default Food;
