import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. Create some state to hold our order;
  // 2. Make a function to add things to order;
  // 3. Make a fnction to remove things from order;
  // 4. Send this data to a serverless function when they checkout

  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };

  const removeFromOrder = (index) => {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('go eat');

    // const body = {
    //   order: attachNamesAndPrices(order, pizzas),
    //   total: formatMoney(calculateOrderTotal(order, pizzas)),
    //   name: values.name,
    //   email: values.email,
    // };

    // const res = await fetch(`${process.env.GATSBY_SERVELESS_BASE}/placeOrder`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // });

    // const text = await res.json();

    // console.log(text);

    // if (res.status >= 400 && res.status < 600) {
    //   setLoading(false);
    //   setError(text.message);
    // } else {
    //   setLoading(false);
    //   setMessage('Success! Come down for your pizza!!!');
    // }
  };

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
