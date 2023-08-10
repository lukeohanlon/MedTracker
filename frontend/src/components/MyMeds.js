import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyMeds = () => {
  const [meds, setMeds] = useState([]);

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
  }, []);

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

  return (
    <div>
      <h2>My Medicines</h2>
      <ul>
        {meds.map((medicine) => (
          <li key={medicine.id}>
            {medicine.generic_name}
            <button onClick={() => handleDelete(medicine.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyMeds;
