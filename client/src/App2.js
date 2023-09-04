
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Home from './components/Home';
import MarketPrice from './components/MarketPrice';
import Header from './components/Header';
import Footer from './components/Footer';
import Error from './components/Error';

function App2() {
  return (
    <div>
        <Routes>
            <Route exact path='/' element={<Home/>}>
              <Route index element={<MarketPrice/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="*" element={<Error/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App2;
