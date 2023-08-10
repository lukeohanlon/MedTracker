import React, {useState} from 'react'

const MedCard = ({medicine, handleDelete}) => {
    const [showFullDosage, setShowFullDosage] = useState(false);

    const toggleDosageText = () => {
        setShowFullDosage(!showFullDosage);
    };

    return (
        <div className="med-card">
          <div className="med-content">
           
            <h2 className="med-title">{medicine.generic_name}</h2>
            <div className="med-info">
            <p className="card-p med-time"><span className="blue">Scheduled: </span>{medicine.reminder_time}</p>
            <p className="card-p recur"><span className="blue">Due every: </span>{medicine.recurring_interval}</p>
            <p className="card-p purpose"><span className="blue">Purpose: </span>{medicine.purpose}</p>
            <p className="card-p info"><span className="blue">Information: </span>
              {showFullDosage
                ? medicine.dosage_text
                : medicine.dosage_text.length > 200
                ? medicine.dosage_text.substring(0, 200) + '...'
                : medicine.dosage_text}
              {medicine.dosage_text.length > 200 && (
                // <button onClick={toggleDosageText}>
                  <span onClick={toggleDosageText} className='blue'> {showFullDosage ? 'Show Less' : 'Show More'} </span>
                // </button>
              )}
            </p>
                </div>
           
            <button onClick={() => handleDelete(medicine.id)}>Delete</button>
          </div>
        </div>
      );
    };
    
    export default MedCard;    
    
    
    
    
    