import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MedCard from '../components/MedCard';
import EditModal from '../components/EditModal';

const MyMeds = ({ meds, setMeds }) => {
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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
      const apiBaseUrl = `http://localhost:3000/api/v1/medications/${id}`;
      await axios.delete(apiBaseUrl);
      // Remove the deleted medication from the state
      setMeds((prevMeds) => prevMeds.filter((med) => med.id !== id));
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };
  const handleEdit = (updatedMed) => {
    const updatedMeds = meds.map((med) =>
      med.id === updatedMed.id ? updatedMed : med
    );
    setMeds(updatedMeds);
    closeEditModal();
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
