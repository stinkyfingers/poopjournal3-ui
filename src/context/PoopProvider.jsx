import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/react'
import { API_BASE } from '../config';
import { PoopContext } from './Poop';

export const PoopProvider = ({ children }) => {
  const [poops, setPoops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchPoops = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const res = await fetch(`${API_BASE}/poop`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPoops(data.poops || data); // adjust if API shape differs
      } catch (e) {
        console.error('Failed to fetch poop entries', e);
        setPoops([]);
      }
      setLoading(false);
    };
    fetchPoops();
    // eslint-disable-next-line
  }, [refresh]);

  const onRefresh = () => setRefresh(prev => !prev);

  return (
    <PoopContext.Provider value={{ poops, loading, onRefresh,  }}>
      {children}
    </PoopContext.Provider>
  );
};
