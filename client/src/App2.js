// import {BrowserRouter, createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import {BrowserRouter, createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";

import './App.css';

import Login from './components/Login';
import  SignUp from './components/SignUp';
import Home from './components/Home';
import MarketPrice from './components/MarketPrice';
import Error from './components/Error';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Basket from './components/Basket';

function App2() {
  const router = createBrowserRouter(
    createRoutesFromElements(
            <Route exact path='/' element={<Home/>}>
              {/* <Route index element={<MarketPrice/>}/> */}
              <Route index element={<ProductList/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<SignUp/>}/>
              <Route path="form" element={<ProductForm/>}/>
              <Route path="basket" element={<Basket/>}/>
              <Route path="*" element={<Error/>}/>
            </Route>
    )
  );
  return(
    <RouterProvider router={router} />
  //   <BrowserRouter>
  //   <Route exact path='/' element={<Home/>}>
  //   <Route index element={<MarketPrice/>}/>
  //   <Route path="login" element={<Login/>}/>
  //   <Route path="*" element={<Error/>}/>
  // </Route>
  // </BrowserRouter>
  )
}
export default App2;
