import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For unique item IDs
import { StockItem } from './types';
import AddItemForm from './components/AddItemForm';
import RemoveItemForm from './components/RemoveItemForm';
import StockList from './components/StockList';

const LOCAL_STORAGE_KEY = 'stockManagerItems';

const App: React.FC = () => {
  const [stock, setStock] = useState<StockItem[]>([]);

  // Load stock from local storage on initial render
  useEffect(() => {
    const storedStock = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedStock) {
      setStock(JSON.parse(storedStock));
    }
  }, []);

  // Save stock to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stock));
  }, [stock]);

  const addItem = useCallback(<T extends string, U extends number>(name: T, quantity: U): void => {
    setStock((prevStock) => {
      const existingItemIndex = prevStock.findIndex(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      );

      if (existingItemIndex > -1) {
        const updatedStock = [...prevStock];
        updatedStock[existingItemIndex] = {
          ...updatedStock[existingItemIndex],
          quantity: updatedStock[existingItemIndex].quantity + quantity,
        };
        return updatedStock;
      } else {
        return [...prevStock, { id: uuidv4(), name, quantity }];
      }
    });
  }, []);

  const removeItem = useCallback(<T extends string, U extends number>(name: T, quantity: U): void => {
    setStock((prevStock) => {
      const existingItemIndex = prevStock.findIndex(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      );

      if (existingItemIndex > -1) {
        const updatedStock = [...prevStock];
        const currentItem = updatedStock[existingItemIndex];

        if (currentItem.quantity <= quantity) {
          // Remove item completely if quantity to remove is greater or equal
          return updatedStock.filter((item) => item.id !== currentItem.id);
        } else {
          // Decrease quantity
          updatedStock[existingItemIndex] = {
            ...currentItem,
            quantity: currentItem.quantity - quantity,
          };
          return updatedStock;
        }
      } else {
        alert(`Item "${name}" não encontrado no estoque.`);
        return prevStock; // Return previous stock unchanged
      }
    });
  }, []);

  // Sort stock alphabetically by item name for better readability
  const sortedStock = [...stock].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl max-w-4xl w-full">
      <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200">
        <AddItemForm onAddItem={addItem} stockItems={sortedStock} />
        <RemoveItemForm onRemoveItem={removeItem} stockItems={sortedStock} />
      </div>
      <div className="lg:w-1/2">
        <StockList items={sortedStock} stockItems={sortedStock} />
      </div>
    </div>
  );
};

export default App;