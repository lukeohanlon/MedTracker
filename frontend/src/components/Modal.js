import React from 'react';

const Modal = ({ children, onClose, brandName }) => {
  return (
    <div  className="modal-wrap">
        <div className="modal">
      <div className="modal-content">
      <h1 className='modal-head'>Set Reminder</h1>
        <h2 className='modal-head'>{brandName}</h2>
        {children}
      </div>
    </div>
    </div>
  );
};

export default Modal;
