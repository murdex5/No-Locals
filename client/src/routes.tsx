import Home from "./pages/Home";
import BusinessList from "./pages/business/BusinessList";
import BusinessDetail from "./pages/business/BusinessDetail";
import About from "./pages/About";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/businesses",
    element: <BusinessList />,
  },
  {
    path: "/b/:id",
    element: <BusinessDetail />,
  },
];
