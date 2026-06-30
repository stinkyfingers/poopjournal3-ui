import React from 'react';
import { useAuth } from '@clerk/react';
import { UserDataContext } from '../context/UserData';
import PoopForm from '../components/PoopForm';
import PoopList from '../components/PoopList';
import { API_BASE } from '../config';

const Poop = () => {
  const { poops, loading, onRefresh } = React.useContext(UserDataContext);
  const { getToken } = useAuth();

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
      await res.json();
      onRefresh();
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
      onRefresh();
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
