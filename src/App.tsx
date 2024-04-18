import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Marketing from "./pages/Marketing/Marketing";
import Business from "./pages/Business/Business";
import Calls from "./pages/Calls/Calls";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Login from "./pages/Login/Login";
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
