import React, { useState } from 'react';
import axios from 'axios';

const EditModal = ({ medication, onClose, onEditSuccess }) => {
  const [editedMedication, setEditedMedication] = useState({
    reminder_time: medication.reminder_time,
    recurring_interval: medication.recurring_interval,
    // Add other fields you want to edit here
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedMedication((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const apiBaseUrl = `http://localhost:3000/api/v1/medications/${medication.id}`;
      const response = await axios.put(apiBaseUrl, editedMedication);

      // Call the onEditSuccess callback with the updated medication
      onEditSuccess(response.data);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error editing medication:', error);
    }
  };

  return (
    <div className="editmodal">
      <div className="modal-content">
        <h2>Edit Medication Reminder</h2>
        <label htmlFor="reminder_time"> Time:</label>
        <br />
        <input
          type="time"
          id="reminder_time"
          name="reminder_time"
          value={editedMedication.reminder_time}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="recurring_interval">Due Every:</label>
        <br />
        <input
          type="text"
          id="recurring_interval"
          name="recurring_interval"
          value={editedMedication.recurring_interval}
          onChange={handleInputChange}
        />

        {/* Add other input fields for editing */}
        
        <div className="modal-buttons-wrap">
          <button className='modal-buttons' onClick={handleEditSubmit}>Save Changes</button>
          <button className='modal-buttons' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
