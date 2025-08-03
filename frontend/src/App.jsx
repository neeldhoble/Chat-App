import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VerifyUser  from "./utils/VerifyUser.jsx";

function App() {

  return (
    <div className="p-2 w-screen h-screen flex items-center justify-center">
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<VerifyUser/>}>
              <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
