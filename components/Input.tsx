import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, className = '', ...rest }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        // ATENÇÃO: Definir a cor do texto como branco em um campo com fundo claro pode torná-lo ilegível.
        // Adicionado um fundo escuro (bg-gray-700) para garantir a legibilidade do texto branco, conforme solicitado.
        // O placeholder também foi ajustado para ser visível no fundo escuro.
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 placeholder-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        {...rest}
      />
    </div>
  );
};

export default Input;