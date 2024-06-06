import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AllTests from "../Pages/AllTests/AllTests";
import PrivateRoute from "./PrivateRoute";
import TestDetails from "../Pages/TestDetails/TestDetails";
import Dashboard from "../Layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allTests",
        element: <AllTests></AllTests>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
        loader: () => fetch('district.json')
      },
      {
        path: "/testDetails/:id",
        element: <PrivateRoute><TestDetails></TestDetails></PrivateRoute>,
        
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "myProfile",
        // element: 
      }]
  }
]);
