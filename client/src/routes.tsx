import Home from "./pages/Home";
import BusinessList from "./pages/business/BusinessList";
import BusinessDetail from "./pages/business/BusinessDetail";
import About from "./pages/About";
import type { RouteObject } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ReportBusiness from "./pages/business/ReportBusiness";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },

  // Login & Register
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  // Business
  {
    path: "/businesses",
    element: <BusinessList />,
  },
  {
    path: "/b/:id",
    element: <BusinessDetail />,
  },
  {
    path: "/report",
    element: <ReportBusiness />,
  },
];
