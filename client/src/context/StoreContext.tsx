import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Basket } from '../models/basket';

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (courseId: string) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error('The store context is currently undefined.');
  }

  return context;
};

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (courseId: string) => {
    if (!basket) return;

    const items = [...basket.items];

    const itemIndex = items.findIndex((i) => i.courseId === courseId);
    if (itemIndex > 0) {
      items.splice(itemIndex, 1);
      setBasket((prev) => {
        return { ...prev!, items };
      });
    }
  };

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
};
