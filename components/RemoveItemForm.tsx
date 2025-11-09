import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import AutocompleteInput from './AutocompleteInput';
import { StockItem } from '../types';

interface RemoveItemFormProps {
  onRemoveItem: (name: string, quantity: number) => void;
  stockItems: StockItem[]; // Adicionado prop para a lista de itens
}

const RemoveItemForm: React.FC<RemoveItemFormProps> = ({ onRemoveItem, stockItems }) => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim() && itemQuantity > 0) {
      onRemoveItem(itemName.trim(), itemQuantity);
      setItemName('');
      setItemQuantity(1);
    } else {
      alert('Por favor, preencha o nome do item e uma quantidade positiva para remover.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Remover Item do Estoque</h3>
      <AutocompleteInput
        id="itemNameRemove"
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
        id="itemQuantityRemove"
        label="Quantidade para Remover"
        type="number"
        min="1"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
        required
      />
      <Button type="submit" variant="danger" fullWidth>
        Remover Item
      </Button>
    </form>
  );
};

export default RemoveItemForm;