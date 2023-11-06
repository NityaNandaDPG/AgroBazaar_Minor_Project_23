import {createBrowserRouter,createRoutesFromElements,Route,Routes,RouterProvider,Navigate} from "react-router-dom";
import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import Home from './components/Home';
import Login from './components/Login';
import  SignUp1 from './components/SignUp1';
import MyProfile from './components/MyProfile';
// import MarketPrice from './components/MarketPrice';
import Error from './components/Error';
import ProductList from './components/ProductList';
import NewProduct2 from './components/NewProduct2';
import MyProduct from './components/MyProduct';
import UpdateProduct from './components/UpdateProduct'; 
import Basket from './components/Basket';
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
              <Route path="signup" element={<SignUp1/>}/>
              <Route path="profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>}/>
              <Route path="form" element={<ProtectedRoute><NewProduct2/></ProtectedRoute>}/>
              <Route path="myproduct" element={<ProtectedRoute><MyProduct /></ProtectedRoute>}/>
              <Route path="updateproduct/:productId" element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>}/>
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
