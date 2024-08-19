import './App.css';
import Login from './Components/Login/Login'
import Navbar from './Components/Navbar/Navbar';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AdminPage from './Components/AdminPage/AdminPage'
import { ToastContainer } from 'react-toastify';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
    <div className="container">
      <Routes>
        <Route path='/' element={<Login />} />
          <Route path='/home' element={<AdminPage />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
