import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Home from "./pages/home/Home";
import Marketing from "./pages/marketing/Marketing";
import Business from "./pages/business/Business";
import Calls from "./pages/calls/Calls";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import "./styles/global.scss"
 
function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout />,
      children: [
        { 
          path: "/",
          element: <Home /> 
        },
        { 
          path: "/marketing",
          element: <Marketing />
        },
        { 
          path: "/business",
          element: <Business />
        },
        { 
          path: "/calls",
          element: <Calls />
        },
        { 
          path: "/users",
          element: <Users />
        },
        { 
          path: "/products",
          element: <Products />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
