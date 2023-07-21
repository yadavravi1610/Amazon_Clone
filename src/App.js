
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header';
import HeaderBottom from './Components/Header/HeaderBottom';
import ErrorPage from './Components/Error/Error';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { productsData } from "./api/api";
import Home from './Home';
import Login from './Components/Login/Login'
import SignUp from './Components/Login/SignUp';

const Layout=()=>{
  return(
    <>
    <Header />
    <HeaderBottom />
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
      ]
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
    }
    
  ])

  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
