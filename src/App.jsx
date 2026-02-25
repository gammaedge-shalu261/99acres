import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PropertyDetail from './pages/PropertyDetail'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
