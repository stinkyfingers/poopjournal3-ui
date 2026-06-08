import React from 'react';

const formatDate = (value) => {
  if (!value) return 'Unknown time';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const DateTime = ({ value }) => {
    return (
        <div className="text-sm text-gray-600">
            {formatDate(value)}
        </div>
    );
};

export default DateTime;