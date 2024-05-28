// App.tsx
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DateProvider } from "./contexts/DateContext";

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
import Product from "./pages/product/Product";
import User from "./pages/user/User";

import "./styles/global.scss";

const queryClient = new QueryClient();

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
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/marketing",
          element: <Marketing />,
        },
        {
          path: "/business",
          element: <Business />,
        },
        {
          path: "/calls",
          element: <Calls />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          // add :id to the end of the slug in order to go to a single user page
          path: "/users/:id",
          element: <User />,
        },
        {
          // add :id to the end of the slug in order to go to a single product page
          path: "/products/:id",
          element: <Product />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <DateProvider>
      <RouterProvider router={router} />
    </DateProvider>
  );
}

export default App;