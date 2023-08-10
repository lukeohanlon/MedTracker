import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DrugAutocomplete = () => {
  const [inputValue, setInputValue] = useState('')
  const [brandNames, setBrandNames] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [drugInfo, setDrugInfo] = useState([])
  const [selectedDrug, setSelectedDrug] = useState(null)
  const [selectedDrugData, setSelectedDrugData] = useState(null)
  const [showFullDosageText, setShowFullDosageText] = useState(false)
  const [selectedMedicines, setSelectedMedicines] = useState([])

  // This function will be used to set the drug when from dropdown
  const onSelect = selected => {
    setSelectedDrug(selected)
    setShowDropdown(false)
  }

  // min length of search input before suggestions
  const MIN_INPUT_LENGTH = 3

  // fetch drugs by brand name
  const fetchBrandNames = async () => {
    if (inputValue.length >= MIN_INPUT_LENGTH) {
      const apiKey = 'lpJ5J2uvxEZeQZkl3JtmeegWpMzgNlUcL00ahzZK'
      const apiUrl = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=patient.drug.openfda.brand_name:"${inputValue}"`

      try {
        const response = await axios.get(apiUrl)
        const extractedBrandNames = response.data.results.flatMap(
          result =>
            result.patient?.drug?.flatMap(drug => drug.openfda?.brand_name) ||
            []
        )

        // Extract additional drug information
        const extractedDrugInfo = response.data.results.flatMap(
          result =>
            result.patient?.drug?.map(drug => ({
              medicinalproduct: drug.medicinalproduct,
              purpose: drug.purpose,
              product_type: drug.openfda?.product_type,
              route: drug.openfda?.route,
              substance_name: drug.openfda?.substance_name,
              generic_name: drug.openfda?.generic_name,
              dosage_and_administration: drug.dosage_and_administration,
            })) || []
        )

        // Sort brand names by how well they match the input value
        const sortedBrandNames = extractedBrandNames.sort((a, b) =>
          a.toLowerCase().includes(inputValue.toLowerCase()) &&
          !b.toLowerCase().includes(inputValue.toLowerCase())
            ? -1
            : !a.toLowerCase().includes(inputValue.toLowerCase()) &&
              b.toLowerCase().includes(inputValue.toLowerCase())
            ? 1
            : a.localeCompare(b)
        )

        setBrandNames(sortedBrandNames) // set sorted drug names when searching
        setDrugInfo(extractedDrugInfo) // Set the extracted drug information
        setShowDropdown(true)
      } catch (error) {
        console.error('Error fetching brand names:', error)
        setShowDropdown(false)
      }
    } else {
      setShowDropdown(false)
    }
  }

  const fetchDrugInfo = async brandName => {
    try {
      const apiKey = 'lpJ5J2uvxEZeQZkl3JtmeegWpMzgNlUcL00ahzZK'
      const apiUrl = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=openfda.brand_name.exact:"${brandName}"&limit=1`

      const response = await axios.get(apiUrl)
      const drugInfo = response.data.results[0]

      if (drugInfo) {
        return {
          brandName: drugInfo.brandName,
          purpose: drugInfo.openfda.purpose,
          genericName: drugInfo.openfda.generic_name?.[0] || '',
          dosageText: drugInfo.dosage_and_administration || '',
          dosageForm: drugInfo.openfda.dosage_form?.[0] || '',
          activeSubstance: drugInfo.openfda.substance_name?.[0] || '',
          route: drugInfo.openfda.route?.[0] || '',
          dosageAmount: drugInfo.dosage_and_administration || '',
        }
      } else {
        const medicinalProductInfo = await fetchDrugInfoByMedicinalProduct(
          brandName
        )
        return {
          brandName: '',
          genericName: medicinalProductInfo.genericName || '',
          dosageText: medicinalProductInfo.dosageText || '',
          dosageForm: medicinalProductInfo.dosageForm || '',
          activeSubstance: medicinalProductInfo.activeSubstance || '',
          route: medicinalProductInfo.route || '',
          dosageAmount: medicinalProductInfo.dosageAmount || '',
        }
      }
    } catch (error) {
      console.error('Error fetching drug info:', error)
      return {
        brandName: '',
        genericName: '',
        dosageText: '',
        dosageForm: '',
        activeSubstance: '',
        route: '',
        dosageAmount: '',
      }
    }
  }

  const fetchDrugInfoByMedicinalProduct = async medicinalProduct => {
    try {
      const apiKey = 'lpJ5J2uvxEZeQZkl3JtmeegWpMzgNlUcL00ahzZK'
      const apiUrl = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=medicinalproduct.exact:"${medicinalProduct}"&limit=1`

      const response = await axios.get(apiUrl)
      const drugInfo = response.data.results[0]

      if (drugInfo) {
        return {
          brandName: '',
          genericName: drugInfo.openfda.generic_name?.[0] || '',
          dosageText: drugInfo.dosage_and_administration || '',
          dosageForm: drugInfo.openfda.dosage_form?.[0] || '',
          purpose: selectedDrug.purpose || '',
          activeSubstance: drugInfo.openfda.substance_name?.[0] || '',
          route: drugInfo.openfda.route?.[0] || '',
          dosageAmount: drugInfo.dosage_and_administration || '',
        }
      } else {
        throw new Error('Drug information not found.')
      }
    } catch (error) {
      console.error('Error fetching drug info by medicinal product:', error)
      return {
        brandName: '',
        purpose: '',
        genericName: '',
        dosageText: '',
        dosageForm: '',
        activeSubstance: '',
        route: '',
        dosageAmount: '',
      }
    }
  }

  const handleSelectBrand = async brandName => {
    const apiKey = 'lpJ5J2uvxEZeQZkl3JtmeegWpMzgNlUcL00ahzZK'
    brandName = brandName.toUpperCase()
    const apiUrl = `https://api.fda.gov/drug/label.json?api_key=${apiKey}&search=openfda.brand_name.exact:${encodeURIComponent(
      brandName
    )}&limit=1`

    try {
      const response = await axios.get(apiUrl)
      const selectedDrugInfo = response.data.results[0]

      // Now, search for adverse events related to the selected drug's active substance (substance name)
      const selectedDrugSubstanceName =
        selectedDrugInfo.openfda.substance_name?.[0]
      if (selectedDrugSubstanceName) {
        const selectedDrugSearchUrl = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=${encodeURIComponent(
          `patient.drug.openfda.substance_name:"${selectedDrugSubstanceName}"`
        )}`

        const selectedDrugResponse = await axios.get(selectedDrugSearchUrl)

        // Update the state with additional data for the selected drug
        setSelectedDrugData(selectedDrugResponse.data)
      }

      // Call your onSelect function with the selected drug details, including dosage information
      onSelect({
        brandName: brandName,
        genericName: selectedDrugInfo.openfda.generic_name?.[0] || '',
        // purpose: selectedDrug.purpose || '',
        dosageText: selectedDrugInfo.dosage_and_administration || '',
        dosageForm: selectedDrugInfo.openfda.route?.[0] || '',
        route: selectedDrugInfo.openfda.route?.join(', ') || '',
      })

      setInputValue(brandName)
      setShowDropdown(false)
    } catch (error) {
      console.error('Error fetching drug data:', error)
    }
  }
  const saveSelectedMedicines = async () => {
    const apiBaseUrl = 'http://localhost:3000/api/v1/medications';
    console.log(selectedDrug.dosageText[0])
    try {
      if (selectedDrug) {
       
        const medicationData = {
          generic_name: selectedDrug.brandName || 'Not Availablee',
          // purpose: selectedDrug.purpose || 'Not Available',
          dosage_text: selectedDrug.dosageText[0] || 'Not Available',
          dosage_form: selectedDrug.dosageForm || 'Not Available',
          active_substance: selectedDrug.activeSubstance || 'Not Available',
          route: selectedDrug.route || 'Not Available'
        };
  
        const response = await axios.post(`${apiBaseUrl}.json`, { medication: medicationData });
        console.log('Medication created:', response.data);
      } else {
        console.error('No selected drug.');
      }
    } catch (error) {
      console.error('Error saving medicines:', error);
    }
  };
  
  

  const addMedicine = medicine => {
    setSelectedMedicines([...selectedMedicines, medicine])
  }

  const cancelSelection = () => {
    setSelectedMedicines([])
  }

  const renderDrugInfo = () => {
    if (selectedDrug) {
      const drugName = selectedDrug.brandName
        ? selectedDrug.brandName.charAt(0) +
          selectedDrug.brandName.slice(1).toLowerCase()
        : ''
      return (
        <div className="search-res-wrap">
          <h2>{drugName} Information</h2>
          {selectedDrug.brandName && (
            <p><span className="blue">Brand Name:</span> {selectedDrug.brandName}</p>
          )}
          <p><span className="blue">Purpose: </span> {selectedDrug.purpose}</p>
          <p><span className="blue">Generic Name:</span> {selectedDrug.genericName}</p>
          {selectedDrug.dosageText && (
            <div>
              <p><span className="blue">Dosage Text:</span></p>
              <ul>
                {showFullDosageText
                  ? selectedDrug.dosageText[0]
                      .split(' • ')
                      .map((item, index) => <li key={index}>{item}</li>)
                  : selectedDrug.dosageText[0]
                      .split(' • ')
                      .slice(0, 50)
                      .map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              {selectedDrug.dosageText[0].split(' • ').length > 50 && (
                <button
                  onClick={() => setShowFullDosageText(!showFullDosageText)}
                >
                  {showFullDosageText ? 'Less' : 'More'}
                </button>
              )}
            </div>
          )}
          <p><span className="blue">Dosage Form:</span> {selectedDrug.dosageForm}</p>
          <p><span className="blue">Active Substance:</span> {selectedDrug.activeSubstance}</p>
          <p><span className="blue">Route:</span> {selectedDrug.route}</p>
          <button onClick={saveSelectedMedicines}>Save Medicines</button>
        <button onClick={cancelSelection}>Cancel</button>
        </div>
      )
    }
    return null
  }

  const handleInputChange = event => {
    const { value } = event.target
    setInputValue(value)
  }

  useEffect(() => {
    fetchBrandNames()
  }, [inputValue])

  return (
    <div className='search-wrap'>
      <input
        type="text"
        placeholder="Search for drugs by brand name..."
        value={inputValue}
        onChange={handleInputChange}
      />
      {showDropdown && brandNames.length > 0 && (
        <ul className="selectable-list">
          {brandNames.map((brandName, index) => (
            <li key={index} onClick={() => handleSelectBrand(brandName)}>
              {brandName}
            </li>
          ))}
        </ul>
      )}
  
        {renderDrugInfo()}
    </div>
  )
}

export default DrugAutocomplete
