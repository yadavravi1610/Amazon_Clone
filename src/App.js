
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header';
import HeaderBottom from './Components/Header/HeaderBottom';
import ErrorPage from './Components/Error/Error';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { productsData } from "./api/api";
import Home from './Pages/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import Cart from './Pages/Cart';

const Layout=()=>{
  return(
    <>
    <Header />
    <HeaderBottom />
    <ScrollRestoration />
    <Outlet />
    <Footer />
    
    </>
  );
}
function App() {
  
  const router = createBrowserRouter([
    {
      path : "/",
      errorElement : <ErrorPage />,
      element : <Layout />,
      children : [
        {
          index : true,
          loader: productsData,
          element : <Home />,
        },
        {
          path: "/Cart",
          element: <Cart />,
        },
      ]
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
    },
    
    
  ])

  
  return (
    <div className='bg-gray-100 overflow-x-hidden'>
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
