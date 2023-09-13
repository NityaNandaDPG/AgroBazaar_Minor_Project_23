import { Outlet} from 'react-router-dom';
import Header from './Header';
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
