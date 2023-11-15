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
import ProductPreview from './components/ProductPreview';
import SellingHub from './components/SellingHub';
import UpdateProduct from './components/UpdateProduct'; 
// import UpdateProduct2 from './components/UpdateProduct2'; 
import Basket from './components/Basket';
import PaymentOrder from './components/PaymentOrder';
import MyOrder from './components/MyOrder';
import PaymentSuccess from './components/PaymentSuccess';
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
              <Route path="preview/:productId" element={<ProductPreview/>}/>
              <Route path="myproduct" element={<ProtectedRoute><SellingHub /></ProtectedRoute>}/>
              <Route path="orders" element={<ProtectedRoute><PaymentOrder/></ProtectedRoute>}/>
              <Route path="updateproduct/:productId" element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>}/>
              {/* <Route path="updateproduct2/:productId" element={<ProtectedRoute><UpdateProduct2/></ProtectedRoute>}/> */}
              <Route path="basket" element={<ProtectedRoute><Basket/></ProtectedRoute>}/>
              <Route path="myorders" element={<ProtectedRoute><MyOrder/></ProtectedRoute>}/>
              <Route path="*" element={<Error/>}/>
              <Route path="temp" element={<Temp />}/>
              <Route path="success" element={<PaymentSuccess />}/>
            </Route>
    )
  );
  return(
    <RouterProvider router={router} />
  )
}
export default App2;
