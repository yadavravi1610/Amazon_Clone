
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header';
import HeaderBottom from './Components/Header/HeaderBottom';
// import ErrorPage from './Components/Error/Error';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { productsData, mensData, womensDressData, womensBagData, womensWatchData, womensShoeData, mensWatchesData, smartphonesData,laptopsData,lightingData,automotiveData, jeweleryData, homeDecorData,furnitureData,motorcycleData,groceriesData,mensShoeData,sunglassesData,fragrancesData,skincareData,topsData} from "./api/api";
import Home from './Pages/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import Cart from './Pages/Cart';
import Products from './Components/Products/Products';

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
      // errorElement : <ErrorPage />,
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
        {
          path: "/mens-shirts",
          loader: mensData,
          children:[
            {
              index: true,
              loader: mensData,
              element: <Products />
            },
            {
              path: ":title",
              loader:mensData,
            }
          ]
        },
        {
          path: "/womens-dresses",
          loader : womensDressData,
          children: [
            {
              index: true,
              loader: womensDressData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensDressData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-watches",
          loader : womensWatchData,
          children: [
            {
              index: true,
              loader: womensWatchData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensWatchData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-bags",
          loader : womensBagData,
          children: [
            {
              index: true,
              loader: womensBagData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensBagData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-shoes",
          loader : womensShoeData,
          children: [
            {
              index: true,
              loader: womensShoeData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensShoeData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/mens-watches",
          loader : mensWatchesData,
          children: [
            {
              index: true,
              loader: mensWatchesData,
              element: <Products />
            },
            {
              path: ":title",
              loader: mensWatchesData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/Smartphones",
          loader : smartphonesData,
          children: [
            {
              index: true,
              loader: smartphonesData,
              element: <Products />
            },
            {
              path: ":title",
              loader: smartphonesData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/Laptops",
          loader : laptopsData,
          children: [
            {
              index: true,
              loader: laptopsData,
              element: <Products />
            },
            {
              path: ":title",
              loader: laptopsData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/lighting",
          loader : lightingData,
          children: [
            {
              index: true,
              loader: lightingData,
              element: <Products />
            },
            {
              path: ":title",
              loader: lightingData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/automotive",
          loader : automotiveData,
          children: [
            {
              index: true,
              loader: automotiveData,
              element: <Products />
            },
            {
              path: ":title",
              loader: automotiveData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-shoes",
          loader : womensShoeData,
          children: [
            {
              index: true,
              loader: womensShoeData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensShoeData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-shoes",
          loader : womensShoeData,
          children: [
            {
              index: true,
              loader: womensShoeData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensShoeData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-shoes",
          loader : womensShoeData,
          children: [
            {
              index: true,
              loader: womensShoeData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensShoeData,
              // element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-jewellery",
          loader:jeweleryData,
          children:[
            {
              index:true,
              loader: jeweleryData,
              element: <Products />
            },
            {
              path: ":title",
              loader:jeweleryData,
              // element: <ProductDetails />,
            }
          ]
        },
        {
          path: "/home-decoration",
          loader:homeDecorData,
          children:[
            {
              index:true,
              loader: homeDecorData,
              element: <Products />
            },
            {
              path: ":title",
              loader:homeDecorData,
              // element: <ProductDetails />,
            }
          ]
        },
        {
          path: "/furniture",
          loader:furnitureData,
          children:[
            {
              index:true,
              loader: furnitureData,
              element: <Products />
            },
            {
              path: ":title",
              loader:furnitureData,
              // element: <ProductDetails />,
            }
          ]
        },
        {
          path: "/motorcycle",
          loader:motorcycleData,
          children:[
            {
              index:true,
              loader: motorcycleData,
              element: <Products />
            },
            {
              path: ":title",
              loader:motorcycleData,
              // element: <ProductDetails />,
            }
          ]
        },
        {
          path: "/groceries",
          loader:groceriesData,
          children:[
            {
              index:true,
              loader: groceriesData,
              element: <Products />
            },
            {
              path: ":title",
              loader:groceriesData,
              // element: <ProductDetails />,
            }
          ]
        },
         {
          path: "/mens-shoes",
          loader:mensShoeData,
          children:[
            {
              index:true,
              loader: mensShoeData,
              element: <Products />
            },
            {
              path: ":title",
              loader:mensShoeData,
              // element: <ProductDetails />,
            }
          ]
        },
        {
          path: "/sunglasses",
          loader:sunglassesData,
          children:[
            {
              index:true,
              loader: sunglassesData,
              element: <Products />
            },
            {
              path: ":title",
              loader:sunglassesData,
              // element: <ProductDetails />,
            }
          ]
        },
       
        {
          path: "/fragrances",
          loader:fragrancesData,
          children:[
            {
              index:true,
              loader: fragrancesData,
              element: <Products />
            },
            {
              path: ":title",
              loader:fragrancesData,
              // element: <ProductDetails />,
            }
          ]
        },
        {
          path: "/skincare",
          loader:skincareData,
          children:[
            {
              index:true,
              loader: skincareData,
              element: <Products />
            },
            {
              path: ":title",
              loader:skincareData,
              // element: <ProductDetails />,
            }
          ]
        },
        {
          path: "/tops",
          loader:topsData,
          children:[
            {
              index:true,
              loader: topsData,
              element: <Products />
            },
            {
              path: ":title",
              loader:topsData,
              // element: <ProductDetails />,
            }
          ]
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
