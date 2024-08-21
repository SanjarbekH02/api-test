import './App.css';
import Login from './Components/Login/Login'
import Navbar from './Components/Navbar/Navbar';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AdminPage from './Components/AdminPage/AdminPage'
import Brands from './Components/Brands/Brands'
import Models from './Components/Models/Models'
import Locations from './Components/Locations/Locations'
import Cities from './Components/Cities/Cities'
import Cars from './Components/Cars/Cars'
import { ToastContainer } from 'react-toastify';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

  let isToken = localStorage.getItem("tokenItem")
  let navigate = useNavigate()

  useEffect(() => {
    if (isToken?.includes("ey")) {
      navigate("/home")
    } else {
      navigate("/")
    }
  }, [])

  return (
    <div className="block">


      {
        isToken &&
        <div className="nav-block">
          <Navbar />
        </div>
      }



      <div className="header-block">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<AdminPage />} />
          <Route path='/brands' element={<Brands />} />
          <Route path='/models' element={<Models />} />
          <Route path='/locations' element={<Locations />} />
          <Route path='/cities' element={<Cities />} />
          <Route path='/cars' element={<Cars />} />
        </Routes>
      </div>

      <ToastContainer />
    </div>

  );
}

export default App;
