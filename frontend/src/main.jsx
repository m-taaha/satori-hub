import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from "./components/PublicRoute";
import Explore from "./pages/Explore";
import Saved from "./pages/Saved";
import ResourceDetails from "./pages/ResourceDetails";


//define all the routes of app here
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, //all the pages will live inside this layout
    children: [
      {
        index: true, //this makes HOME the default page for "/"
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/saved",
        element: (
          <ProtectedRoute>
            <Saved />
          </ProtectedRoute>
        ),
      },
      {
        path: "/resource/:id",
        element: <ResourceDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
