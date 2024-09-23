import { useEffect, useState } from 'react';
import agent from '../actions/agent';
import { Basket } from '../models/basket';

const BasketPage = () => {
  const [items, setItems] = useState<Basket>();

  useEffect(() => {
    agent.Baskets.get().then((response) => {
      setItems(response);
    });
  }, []);

  return <div>{items?.clientId}</div>;
};

export default BasketPage;
