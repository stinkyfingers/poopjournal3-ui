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
	const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

const PoopForm = ({ onAdd }) => {
  const [bristolScale, setBristolScale] = useState(4);
  const [urgency, setUrgency] = useState(5);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [timestamp, setTimestamp] = useState(formatLocalDatetimeInput(roundToNearest15()));

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedTags = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);

    onAdd({
      bristol_scale: Number(bristolScale),
      urgency: Number(urgency),
      notes,
      tags: parsedTags,
      timestamp: new Date(timestamp).toISOString(),
    });

    setBristolScale(4);
    setUrgency(5);
    setNotes('');
    setTags('');
    setTimestamp(formatLocalDatetimeInput(roundToNearest15()));
  };

  const disabled = !timestamp;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
        <label htmlFor="bristol-scale" className="block text-sm/6 font-medium text-gray-900">
          Bristol Scale:
        </label>
        <Input
          id="bristol-scale"
          type="number"
          min="1"
          max="7"
          className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          value={bristolScale}
          onChange={e => setBristolScale(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 mt-2">
        <label htmlFor="urgency" className="block text-sm/6 font-medium text-gray-900">
          Urgency:
        </label>
        <Input
          id="urgency"
          type="number"
          min="1"
          max="10"
          className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          value={urgency}
          onChange={e => setUrgency(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 mt-2">
        <label htmlFor="notes" className="block text-sm/6 font-medium text-gray-900">
          Notes:
        </label>
        <Input
          id="notes"
          className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>

      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 mt-2">
        <label htmlFor="tags" className="block text-sm/6 font-medium text-gray-900">
          Tags:
        </label>
        <Input
          id="tags"
          className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="comma,separated,tags"
        />
      </div>

      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 mt-2">
        <label htmlFor="timestamp" className="block text-sm/6 font-medium text-gray-900">
          Date/Time:
        </label>
        <Input
          id="timestamp"
          type="datetime-local"
          className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          value={timestamp}
          onChange={e => setTimestamp(e.target.value)}
          step="900"
          required
        />
      </div>

      <div className="flex justify-end mt-2">
        <Button type="submit" className="disabled:opacity-50" disabled={disabled}>Add Poop</Button>
      </div>
    </form>
  );
};

export default PoopForm;
