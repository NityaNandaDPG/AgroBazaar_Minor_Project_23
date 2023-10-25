import {createBrowserRouter,createRoutesFromElements,Route,Routes,RouterProvider,Navigate} from "react-router-dom";
import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import Home from './components/Home';
import Login from './components/Login';
import  SignUp from './components/SignUp';
import MyProfile from './components/MyProfile';
// import MarketPrice from './components/MarketPrice';
import Error from './components/Error';
import ProductList from './components/ProductList';
import NewProduct1 from './components/NewProduct1';
// import ProductForm from './components/ProductForm';
import Basket from './components/Basket';
import { useSelector } from "react-redux"; // Import the useSelector hook
import ProtectedRoute from "./utils/ProtectedRoute";
import Temp from './temp/Temp';

function App2() {

  const router = createBrowserRouter(
    createRoutesFromElements(
            <Route exact path='/' element={<Home/>}>
              {/* <Route index element={<MarketPrice/>}/> */}
              <Route index element={<ProductList/>}/>
              <Route path="admin" element={<AdminPanel/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<SignUp/>}/>
              <Route path="profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>}/>
              <Route path="form" element={<ProtectedRoute><NewProduct1/></ProtectedRoute>}/>
              <Route path="basket" element={<ProtectedRoute><Basket/></ProtectedRoute>}/>
              <Route path="*" element={<Error/>}/>
              <Route path="temp" element={<Temp />}/>
            </Route>
    )
  );
  return(
    <RouterProvider router={router} />
  )
}
export default App2;
