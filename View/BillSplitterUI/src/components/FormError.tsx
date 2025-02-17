import React from 'react';

interface FormErrorProps {
  message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return <p className="text-red-500 text-center mb-4">{message}</p>;
};

export default FormError;
