import logo from './logo.svg'
import './index.css'
import MedicationList from './components/MedicationList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<MedicationList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
