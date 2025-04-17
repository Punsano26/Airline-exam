import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../Pages/Home/Home";
import FlightDashboard from "../Pages/admin/FlightDashboard";
import Login from "../Pages/admin/Login";
import PassengerRegister from "../Pages/passenger/Register";
import PassengerLogin from "../Pages/passenger/Login";
import PassengerProfile from "../Pages/passenger/Profile";
import FlightList from "../Pages/passenger/FlightList";
import MyTickets from "../Pages/passenger/MyTickets";
import BookingPage from "../Pages/passenger/BookingPage";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/passenger/profile",
        element: <PassengerProfile />,
      },
      {
        path: "register",
        element: <PassengerRegister />,
      },
      {
        path: "login",
        element: <PassengerLogin />,
      },
      {
        path: "/passenger/flights",
        element: <FlightList />,
      },
      {
        path: "my-tickets",
        element: <MyTickets />,
      },
      {
        path: "booking/:flightId",
        element: <BookingPage />,
      }
    ],
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "flights",
        element: <FlightDashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      
    ],
  },
]);

export default Router;
