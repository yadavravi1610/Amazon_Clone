import Slider from './Home/Slider';
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header';

function App() {
  const images =[
    "https://images-eu.ssl-images-amazon.com/images/G/31/prime/PD23/ACQ/hero/v2/PC_Hero_3000x1200_2X_EN._CB600991698_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/ATF/revised/new/Skincare-Herofader-PC._CB594538667_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2023/BAU2023/ATFGW/July_Bedsheets_Desk_3000x1200_Unrec._CB601155232_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/GW/3000x1200-Read-lead--succeed-BB_July_2023._CB601575988_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg"
  ]
  return (
    <div>
      <Header />
      <Slider images={images}/>
      <Footer />
    </div>
  );
}

export default App;
