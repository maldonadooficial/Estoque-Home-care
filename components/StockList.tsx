import React, { useState } from 'react';
import { StockItem } from '../types';
import Button from './Button';
import AutocompleteInput from './AutocompleteInput'; // Importa o novo componente

interface StockListProps {
  items: StockItem[];
  stockItems: StockItem[]; // Prop para passar a lista completa para AutocompleteInput
}

const StockList: React.FC<StockListProps> = ({ items, stockItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<StockItem | null>(null);
  const [searchMessage, setSearchMessage] = useState<string>('');

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault(); // Previne o comportamento padrão do formulário se chamado por evento de formulário

    if (!searchTerm.trim()) {
      setSearchResult(null);
      setSearchMessage('Por favor, digite o nome de um item para buscar.');
      return;
    }

    const foundItem = items.find(
      (item) => item.name.toLowerCase() === searchTerm.trim().toLowerCase()
    );

    if (foundItem) {
      setSearchResult(foundItem);
      setSearchMessage('');
    } else {
      setSearchResult(null);
      setSearchMessage(`Item "${searchTerm.trim()}" não encontrado no estoque.`);
    }
  };

  const exportToCsv = () => {
    if (items.length === 0) {
      alert('Não há itens no estoque para exportar.');
      return;
    }

    const headers = 'Item,Quantidade\n';
    const csvContent = items
      .map((item) => `${item.name},${item.quantity}`)
      .join('\n');

    const fullCsv = headers + csvContent;
    const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'estoque.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Itens em Estoque</h3>

      {/* Seção de Consulta de Item */}
      <form onSubmit={handleSearch} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="text-lg font-medium mb-3 text-gray-800">Consultar Quantidade de Item</h4>
        <div className="flex gap-2 items-end">
          <div className="flex-grow"> {/* Removido ref e relative pois AutocompleteInput já gerencia isso */}
            <AutocompleteInput
              id="searchItemName"
              type="text"
              label="Nome do Item"
              placeholder="Digite o nome do item"
              value={searchTerm}
              onChange={(value) => {
                setSearchTerm(value);
                setSearchMessage(''); // Limpa a mensagem ao digitar
                setSearchResult(null); // Limpa o resultado ao digitar
              }}
              onSelect={(item) => {
                setSearchTerm(item.name);
                handleSearch(); // Dispara a busca automaticamente ao selecionar uma sugestão
              }}
              items={stockItems} // Passa a lista completa de itens
              // Removido className="!bg-white !text-gray-900" para usar o estilo padrão do Input (fundo escuro, texto branco)
              required
            />
          </div>
          <Button type="submit" variant="primary">
            Buscar Item
          </Button>
        </div>
        {searchMessage && (
          <p className="mt-2 text-sm text-red-600">{searchMessage}</p>
        )}
        {searchResult && (
          <div className="mt-3 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded-md">
            <p className="font-semibold">{searchResult.name}: <span className="font-bold">{searchResult.quantity}</span> unidades em estoque.</p>
          </div>
        )}
      </form>

      {/* Botão de Exportar */}
      <div className="mb-6">
        <Button onClick={exportToCsv} variant="secondary" fullWidth>
          Exportar Estoque (CSV)
        </Button>
      </div>

      {/* Lista de Estoque */}
      {items.length === 0 ? (
        <div className="text-center text-gray-600 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p>Seu estoque está vazio. Adicione alguns itens para começar!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Item
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Quantidade
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{item.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 font-medium">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockList;