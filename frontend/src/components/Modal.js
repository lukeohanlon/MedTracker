import React from 'react';

const Modal = ({ children, onClose, brandName }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{brandName}</h3>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
