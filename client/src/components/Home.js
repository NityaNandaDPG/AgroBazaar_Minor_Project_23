import { Outlet,Link } from 'react-router-dom';
import Header from './Header';
import MarketPrice from './MarketPrice';
import Footer from './Footer';

function Home() {
  return (
    
    <div>
      <Header/>
      <main>
        {/* <MarketPrice/> */}
        <Outlet/>
      </main>
      <Footer/>

    </div>

  );
}

export default Home;
