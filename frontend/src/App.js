import logo from './logo.svg'
import './index.css'
import MedicationList from './components/MedicationList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MyMeds from './views/MyMeds'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" exact element={<MedicationList />} />
          <Route path='/mymeds' element={<MyMeds />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
