import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import AutocompleteInput from './AutocompleteInput';
import { StockItem } from '../types';

interface AddItemFormProps {
  onAddItem: (name: string, quantity: number) => void;
  stockItems: StockItem[]; // Adicionado prop para a lista de itens
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, stockItems }) => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim() && itemQuantity > 0) {
      onAddItem(itemName.trim(), itemQuantity);
      setItemName('');
      setItemQuantity(1);
    } else {
      alert('Por favor, preencha o nome do item e uma quantidade positiva.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-b border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Adicionar Item ao Estoque</h3>
      <AutocompleteInput
        id="itemNameAdd"
        label="Nome do Item"
        type="text"
        placeholder="Ex: Camiseta, Fio de Cobre"
        value={itemName}
        onChange={setItemName}
        onSelect={(item) => setItemName(item.name)}
        items={stockItems}
        required
      />
      <Input
        id="itemQuantityAdd"
        label="Quantidade"
        type="number"
        min="1"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
        required
      />
      <Button type="submit" fullWidth>
        Adicionar Item
      </Button>
    </form>
  );
};

export default AddItemForm;