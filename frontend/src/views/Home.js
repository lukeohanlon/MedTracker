import React from 'react'

const Home = () => {
  return (
    <div>Home
        <div className="meds">
        <div className="med-list">
        {meds.map((med, index) => (
          <MedCard key={index} med={med} link={medPlaces[index].link} />
        ))}
      </div>
        </div>
    </div>
  )
}

export default Home