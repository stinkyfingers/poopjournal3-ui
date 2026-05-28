import React from 'react';
import Button from './Button';

const formatCreatedAt = (createdAt) => {
  if (!createdAt) return 'Unknown time';

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return String(createdAt);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${hours}:${minutes} ${year}:${month}:${day}`;
};

const FoodList = ({ foods, onDelete }) => (
  <ul className="list-none p-0 m-0">
    {foods.map(food => (
      <li key={food.id} className="py-3 border-b border-gray-200 last:border-b-0">
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm text-gray-600">
            {formatCreatedAt(food.created_at || food.timestamp || food.datetime)}
          </div>
          <div className="font-semibold text-gray-900 min-w-0 max-w-1/2 whitespace-normal break-words [overflow-wrap:anywhere]">
            {food.name}
          </div>
          <Button
            onClick={() => onDelete(food.id)}
            className="ml-4 bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
          >
            Delete
          </Button>
        </div>
        <div className="mt-2 text-gray-700 max-w-1/2 mx-auto text-center whitespace-normal break-words [overflow-wrap:anywhere]">
          {food.description || ''}
        </div>
      </li>
    ))}
  </ul>
);

export default FoodList;
