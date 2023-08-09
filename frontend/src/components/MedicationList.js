import React, { useState } from 'react';
import DrugAutocomplete from './DrugAutoComplete';

const MedicationList = () => {
  const [selectedDrug, setSelectedDrug] = useState(null);

  // This function will receive the selected drug information from DrugAutocomplete
  const handleDrugSelection = (selected) => {
    setSelectedDrug(selected);
  };

  return (
    <div>
      <h1>Medication List</h1>
      <DrugAutocomplete onSelect={handleDrugSelection} />
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
      </div>
    </div>
  );
};

export default MedicationList;
