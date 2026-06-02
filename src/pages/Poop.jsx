import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/react';
import PoopForm from '../components/PoopForm';
import PoopList from '../components/PoopList';
import { API_BASE } from '../config';

const Poop = () => {
  const [poops, setPoops] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setPoops(data.poops || data);
      } catch {
        setPoops([]);
      }
      setLoading(false);
    };

    fetchPoops();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async (poop) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/poop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(poop),
      });
      const data = await res.json();
      setPoops([...poops, data]);
    } catch (error) {
      console.error('Failed to add poop entry', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      await fetch(`${API_BASE}/poop?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setPoops(poops.filter(poop => poop.id !== id));
    } catch (error) {
      console.error('Failed to delete poop entry', error);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Poop</h1>
      <PoopForm onAdd={handleAdd} />
      {loading ? <p>Loading...</p> : <PoopList poops={poops} onDelete={handleDelete} />}
    </div>
  );
};

export default Poop;
