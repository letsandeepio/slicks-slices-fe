import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order;
  // 2. Make a function to add things to order;
  // 3. Make a fnction to remove things from order;
  // 4. Send this data to a serverless function when they checkout

  const [order, setOrder] = useState([]);

  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };

  const removeFromOrder = (index) => {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  };

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
