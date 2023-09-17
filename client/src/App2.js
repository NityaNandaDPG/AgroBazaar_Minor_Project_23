// import {BrowserRouter, createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import {BrowserRouter, createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";

import './App.css';

import Login from './components/Login';
import  SignUp from './components/SignUp';
import Home from './components/Home';
import MarketPrice from './components/MarketPrice';
import Header from './components/Header';
import Footer from './components/Footer';
import Error from './components/Error';

function App2() {
  const router = createBrowserRouter(
    createRoutesFromElements(
            <Route exact path='/' element={<Home/>}>
              <Route index element={<MarketPrice/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<SignUp/>}/>
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
