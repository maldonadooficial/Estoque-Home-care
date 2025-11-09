import React, { useState, useRef, useEffect } from 'react';
import Input from './Input';
import { StockItem } from '../types';

interface AutocompleteInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  items: StockItem[];
  value: string;
  onChange: (value: string) => void;
  onSelect: (item: StockItem) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  id,
  placeholder,
  items,
  value,
  onChange,
  onSelect,
  className = '',
  ...rest
}) => {
  const [suggestions, setSuggestions] = useState<StockItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Efeito para esconder as sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue); // Propaga a mudança para o componente pai

    if (inputValue.trim().length > 0) {
      const filteredSuggestions = items.filter((item) =>
        item.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (item: StockItem) => {
    onSelect(item); // Propaga a seleção para o componente pai
    setShowSuggestions(false);
    setSuggestions([]); // Limpa as sugestões após a seleção
  };

  const handleFocus = () => {
    if (value.trim().length > 0 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        id={id}
        label={label}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        autoComplete="off" // Desativa o autocomplete do navegador
        className={className}
        {...rest}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-900"
              onClick={() => handleSelectSuggestion(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;