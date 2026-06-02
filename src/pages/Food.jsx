import React, { useEffect, useState } from 'react';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import { useAuth } from '@clerk/react'
import { API_BASE } from '../config';


const Food = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const res = await fetch(`${API_BASE}/food`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setFoods(data.foods || data); // adjust if API shape differs
      } catch (e) {
        setFoods([]);
      }
      setLoading(false);
    };
    fetchFoods();
    // eslint-disable-next-line
  }, []);

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
      const data = await res.json();
      setFoods([...foods, data]);
    } catch (e) {}
  };

  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      await fetch(`${API_BASE}/food?id=${id}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setFoods(foods.filter(f => f.id !== id));
    } catch (e) {}
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
