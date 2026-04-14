import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";

export const router  = createBrowserRouter([
   {
    path: '/',
    Component: HomeLayout,
    children: [
        {
            index: true,
            Component: Home
        }, 
        {
            path: "/register",
            Component: Register
        }
    ]
   }
])