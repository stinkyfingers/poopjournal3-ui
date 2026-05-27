import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

function roundToNearest15(date = new Date()) {
  const ms = 1000 * 60 * 15;
  return new Date(Math.round(date.getTime() / ms) * ms);
}

const FoodForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState(roundToNearest15().toISOString().slice(0, 16));
  const [tags] = useState([]); // Not implemented yet

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, description, datetime, tags });
    setName('');
    setDescription('');
    setDatetime(roundToNearest15().toISOString().slice(0, 16));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: <Input value={name} onChange={e => setName(e.target.value)} required /></label>
      </div>
      <div>
        <label>Description: <Input value={description} onChange={e => setDescription(e.target.value)} /></label>
      </div>
      <div>
        <label>Date/Time: <Input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} step="900" required /></label>
      </div>
      <div>
        <label>Tags: <Input value="" disabled placeholder="(not implemented)" /></label>
      </div>
      <Button type="submit">Add Food</Button>
    </form>
  );
};

export default FoodForm;
