import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MedCard from '../components/MedCard'

const MyMeds = ({meds, setMeds}) => {
 

  useEffect(() => {
    // Fetch medications from the API and store them in the state
    const fetchMedications = async () => {
      try {
        const apiBaseUrl = 'http://localhost:3000/api/v1/medications'
        const response = await axios.get(apiBaseUrl)
        setMeds(response.data)
      } catch (error) {
        console.error('Error fetching medications:', error)
      }
    }

    fetchMedications()
  }, [])

  const handleDelete = async id => {
    try {
      const apiBaseUrl = `http://localhost:3000/api/v1/medications/${id}`
      await axios.delete(apiBaseUrl)
      // Remove the deleted medication from the state
      setMeds(prevMeds => prevMeds.filter(med => med.id !== id))
    } catch (error) {
      console.error('Error deleting medication:', error)
    }
  }

  return (
    <div>
      <h2 className='reminders-head'>My Reminders</h2>
      <div className="meds">
        <div className="med-list">
          {meds.map(medicine => (
            <MedCard  key={medicine.id} medicine={medicine} id={medicine.id} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyMeds
