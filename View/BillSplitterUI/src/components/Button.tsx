import React from 'react';

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      >
      {text}
    </button>
  );
};

export default Button;
