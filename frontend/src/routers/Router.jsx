import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../Pages/Home/Home"
 
const Router = createBrowserRouter([
    {
        path: "/",
    element: <MainLayout />,
    children: [
        {
            path:"",
            element: <Home/>
        }
    ]
    }
])

export default Router