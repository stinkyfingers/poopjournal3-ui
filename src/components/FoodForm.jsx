import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

function roundToNearest15(date = new Date()) {
  const newDate = new Date(date);
  const minutes = newDate.getMinutes();
  const roundedMinutes = Math.round(minutes / 15) * 15;
  newDate.setMinutes(roundedMinutes, 0, 0);
  return newDate;
}

function formatLocalDatetimeInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const FoodForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState(formatLocalDatetimeInput(roundToNearest15()));
  const [tags] = useState([]); // Not implemented yet

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name,
      description,
      datetime,
      tags,
      timestamp: new Date(datetime).toISOString()
    });
    setName('');
    setDescription('');
    setDatetime(formatLocalDatetimeInput(roundToNearest15()));
  };

  const disabled = !name || !datetime;

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
      >
        <label
          htmlFor="name"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Name:
        </label>
        <Input
          id="name"
          className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div
        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 mt-2"
      >
        <label
          htmlFor="description"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Description:
        </label>
        <Input
          id="description"
          className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div
        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 mt-2"
      >
        <label
          htmlFor="datetime"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Date/Time:
        </label>
        <Input
          id="datetime"
          type="datetime-local"
          className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
          step="900"
          required
        />
      </div>
      <div
        className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 mt-2"
      >
        <label
          htmlFor="tags"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Tags:
        </label>
        <Input
          id="tags"
          className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          value=""
          disabled
          placeholder="(not implemented)"
        />
      </div>
      <div
        className="flex justify-end mt-2"
      >
        <Button type="submit" className="disabled:opacity-50" disabled={disabled}>Add Food</Button>
      </div>
    </form>
  );
};

export default FoodForm;
