import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FormPage from './pages/FormPage'
import Empleos from './pages/Empleos'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormPage />} />
          <Route path='/empleos' element={<Empleos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
