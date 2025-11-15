import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


//define all the routes of app here
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/> , //all the pages will live inside this layout
    children: [
      {
        index: true, //this makes HOME the default page for "/"
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />
      },
      //dashboard and all i'll add here later
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
