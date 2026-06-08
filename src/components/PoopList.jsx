import React from 'react';
import Button from './Button';
import DateTime from './DateTime';

const PoopList = ({ poops, onDelete }) => (
  <ul className="list-none p-0 m-0">
    {poops.map((poop) => (
      <li key={poop.id} className="py-3 border-b border-gray-200 last:border-b-0">
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm text-gray-600">
            <DateTime value={poop.timestamp} />
          </div>
          <div className="font-semibold text-gray-900 min-w-0 max-w-1/2 whitespace-normal break-words [overflow-wrap:anywhere]">
            Bristol {poop.bristol_scale} · Urgency {poop.urgency}
          </div>
          { onDelete && (
            <Button
              onClick={() => onDelete(poop.id)}
              className="ml-4 bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
            >
              Delete
            </Button>
          )}
        </div>

        {poop.notes && (
          <div className="mt-2 text-gray-700 max-w-1/2 mx-auto text-center whitespace-normal break-words [overflow-wrap:anywhere]">
            {poop.notes}
          </div>
        )}

        {Array.isArray(poop.tags) && poop.tags.length > 0 && (
          <div className="mt-1 text-xs text-gray-500 text-center">
            {poop.tags.join(', ')}
          </div>
        )}
      </li>
    ))}
  </ul>
);

export default PoopList;
