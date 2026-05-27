import React from 'react';
import Button from './Button';
import List from './List';

const FoodList = ({ foods, onDelete }) => (
  <ul>
    {foods.map(food => (
      <List key={food.id}>
        <strong>{food.name}</strong> ({food.datetime})<br />
        {food.description && <span>{food.description}<br /></span>}
        <Button onClick={() => onDelete(food.id)}>Delete</Button>
      </List>
    ))}
  </ul>
);

export default FoodList;
