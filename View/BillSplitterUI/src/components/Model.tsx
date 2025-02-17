import React from 'react';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title,isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-red-500">X</button>
        </div>
        <div className="mt-4">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Modal;
