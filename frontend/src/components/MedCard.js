import React, { useState } from 'react';
import EditModal from './EditModal';

const MedCard = ({ medicine, handleDelete, handleEdit }) => {
  const [showFullDosage, setShowFullDosage] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleDosageText = () => {
    setShowFullDosage(!showFullDosage);
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="med-card">
      <div className="med-content">
        <h2 className="med-title">{medicine.generic_name}</h2>
        <div className="med-info">
          <p className="card-p med-time">
            <span className="blue">Scheduled: </span>
            {medicine.reminder_time}
          </p>
          <p className="card-p recur">
            <span className="blue">Due every: </span>
            {medicine.recurring_interval}
          </p>
          <p className="card-p purpose">
            <span className="blue">Purpose: </span>
            {medicine.purpose}
          </p>
          <p className="card-p info">
            <span className="blue">Information: </span>
            {showFullDosage
              ? medicine.dosage_text
              : medicine.dosage_text.length > 200
              ? medicine.dosage_text.substring(0, 200) + '...'
              : medicine.dosage_text}
            {medicine.dosage_text.length > 200 && (
              <span onClick={toggleDosageText} className="blue">
                {' '}
                {showFullDosage ? 'Show Less' : 'Show More'}{' '}
              </span>
            )}
          </p>
        </div>

        <div className="card-buttons">
          <button onClick={openEditModal}>Edit</button>
          <button onClick={() => handleDelete(medicine.id)}>Delete</button>
        </div>
      </div>

      {showEditModal && (
        <EditModal
          medication={medicine}
          onClose={closeEditModal}
          onEditSuccess={handleEdit}
        />
      )}
    </div>
  );
};

export default MedCard;