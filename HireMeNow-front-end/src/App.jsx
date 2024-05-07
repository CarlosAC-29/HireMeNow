import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FormPage from './pages/FormPage'
import Empleos from './pages/Empleos'
import './App.css'
import StateComp from './context/StateCompo.jsx'

function App() {

  return (
    <StateComp>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormPage />} />
          <Route path='/empleos' element={<Empleos />} />
        </Routes>
      </BrowserRouter>
    </StateComp>
  )
}

export default App
