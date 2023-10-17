import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Error from './components/Error';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Basket from './components/Basket';
import { useSelector } from "react-redux";
import ProtectedRoute from "./utils/ProtectedRoute";

function App3() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App3;
