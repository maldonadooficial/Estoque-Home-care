import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...rest
}) => {
  const baseStyles = 'font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150';
  const widthStyles = fullWidth ? 'w-full' : '';

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-500';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
