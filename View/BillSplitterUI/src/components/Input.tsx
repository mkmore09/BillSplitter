import React from 'react';

interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ id, type, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{placeholder}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
