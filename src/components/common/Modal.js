import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-75 bg-[#070707] flex justify-center md:items-center z-[10000]"
      onClick={handleOverlayClick}
    >
      <div className="bg-background max-md:mx-6 max-md:w-full max-md:h-fit max-md:my-10 text-black rounded-[10px] relative z-50">
        {children}
      </div>
    </div>
  );
};

export default Modal;
