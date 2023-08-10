import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MedCard from '../components/MedCard';
import EditModal from '../components/EditModal';

const MyMeds = ({ meds, setMeds, rend }) => {
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dummyState, setDummyState] = useState(false); 


  const openEditModal = (medication) => {
    setSelectedMedication(medication);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedMedication(null);
    setShowEditModal(false);
  };

  useEffect(() => {
    // Fetch medications from the API and store them in the state
    const fetchMedications = async () => {
      try {
        const apiBaseUrl = 'http://localhost:3000/api/v1/medications';
        const response = await axios.get(apiBaseUrl);
        setMeds(response.data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, [setMeds]);

  const handleDelete = async (id) => {
    try {
      // Delete logic...
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };
  const handleEdit = (updatedMed) => {
    const updatedMeds = meds.map((med) =>
      med.id === updatedMed.id ? updatedMed : med
    );
    rend()
    setMeds(updatedMeds);
    closeEditModal();
    setDummyState(!dummyState); // Toggle dummy state to force re-render
  };

  return (
    <div>
      <h2 className="reminders-head">My Reminders</h2>
      <div className="meds">
        <div className="med-list">
          {meds.map((medicine) => (
            <MedCard
              key={medicine.id}
              medicine={medicine}
              handleDelete={handleDelete}
              handleEdit={() => openEditModal(medicine)}
            />
          ))}
        </div>
      </div>
      {showEditModal && (
        <EditModal
          medication={selectedMedication}
          onClose={closeEditModal}
          onEditSuccess={handleEdit}
        />
      )}
    </div>
  );
};

export default MyMeds;
