import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/react'
import { API_BASE } from '../config';
import { FoodContext } from './Food';

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
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
        console.error('Failed to fetch food entries', e);
        setFoods([]);
      }
      setLoading(false);
    };
    fetchFoods();
    // eslint-disable-next-line
  }, [refresh]);

  const onRefresh = () => setRefresh(prev => !prev);

  return (
    <FoodContext.Provider value={{ foods, loading, onRefresh,  }}>
      {children}
    </FoodContext.Provider>
  );
};
