import { useEffect, useState, createContext } from 'react';
import { useAuth } from '@clerk/react'
import { API_BASE } from '../config';

export const UserDataProvider = ({ children }) => {
  const [poops, setPoops] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const res = await fetch(`${API_BASE}/userdata`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPoops(data.poops || []);
        setFoods(data.foods || []);
      } catch (e) {
        console.error('Failed to fetch user data', e);
        setPoops([]);
        setFoods([]);
      }
      setLoading(false);
    };
    fetchUserData();
    // eslint-disable-next-line
  }, [refresh]);

  const onRefresh = () => setRefresh(prev => !prev);

  return (
    <UserDataContext.Provider value={{ poops, foods, loading, onRefresh,  }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const UserDataContext = createContext({
  poops: [],
  foods: [],
  loading: true,
});

