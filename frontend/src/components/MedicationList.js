import React, { useState } from 'react';
import DrugAutocomplete from './DrugAutoComplete';
import MyMeds from '../views/MyMeds';

const MedicationList = () => {
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [meds, setMeds] = useState([])
  const [dummyState, setDummyState] = useState(false); 
  const addMedication = newMedication => {
    setMeds(prevMeds => [...prevMeds, newMedication]);
  };

  // This function will receive the selected drug information from DrugAutocomplete
  const handleDrugSelection = (selected) => {
    setSelectedDrug(selected);
  };
  const rendizzy = () => {
    setDummyState(!dummyState); 
  }
  
  return (
    <div>
      <h1>Medication List</h1>
      <DrugAutocomplete onSelect={handleDrugSelection} onAddMedication={addMedication}/>
      <div className="medication-info">
        {selectedDrug && (
          <div>
            <h2>Selected Medication Information</h2>
            <p>Brand Name: {selectedDrug.brandName}</p>
            <p>Generic Name: {selectedDrug.genericName}</p>
            <p>Dosage Text: {selectedDrug.dosageText}</p>
            <p>Dosage Form: {selectedDrug.dosageForm}</p>
          </div>
        )}
        <MyMeds  meds={meds} setMeds={setMeds}/>
      </div>
    </div>
  );
};

export default MedicationList;
