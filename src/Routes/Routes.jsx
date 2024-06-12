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
import MyProfile from "../Pages/Dashboard/User/MyProfile";
import AddTests from "../Pages/Dashboard/Admin/AddTests";
import TestsList from "../Pages/Dashboard/Admin/TestsList";
import UpdateTests from "../Pages/Dashboard/Admin/UpdateTests";
import Allusers from "../Pages/Dashboard/AllUsers/Allusers";
import AdminRoute from "./AdminRoute";
import AddBanner from "../Pages/Dashboard/Admin/AddBanner";
import AllBanners from "../Pages/Dashboard/Admin/AllBanners/AllBanners";
import Reservations from "../Pages/Dashboard/User/Reservations";
import TestResults from "../Pages/Dashboard/User/TestResults";
import UpcomingAppointments from "../Pages/Dashboard/User/UpcomingAppointments";
import Statistics from "../Pages/Dashboard/Admin/Statistics";
import AboutUs from "../Pages/About Us/AboutUs";

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
        path: "/aboutUs",
        element: <AboutUs></AboutUs>
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
      // user routes
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
        
      },
      {
        path: "myUpcomingAppointments",
        element: <UpcomingAppointments></UpcomingAppointments>
      },
      {
        path: "testResults",
        element: <TestResults></TestResults>
      },
      // admin routes
      {
        path: "statistics",
        element: <AdminRoute><Statistics></Statistics></AdminRoute>
      },
      {
        path: "allUsers",
        element: <AdminRoute><Allusers></Allusers></AdminRoute>
      },
      {
        path: "addTest",
        element: <AdminRoute><AddTests></AddTests></AdminRoute>
      },
      {
        path: "allTests",
        element: <AdminRoute><TestsList></TestsList></AdminRoute>
      },
      {
        path: "updateTests/:id",
        element: <AdminRoute><UpdateTests></UpdateTests></AdminRoute>
      },
      {
        path: "reservations",
        element:<AdminRoute><Reservations></Reservations></AdminRoute>
      },
      {
        path: "addBanners",
        element: <AdminRoute><AddBanner></AddBanner></AdminRoute>
      },
      {
        path: "allBanners",
        element:<AdminRoute><AllBanners></AllBanners></AdminRoute>
      },
      
    ]
  }
]);
