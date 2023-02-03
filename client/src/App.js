import Navbar from "./component/navbar"
import Home from "./component/Home"
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from "react-router-dom";
import Create from "./component/Create";
import { useState } from "react";
const Layout=()=>{
  return(
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/create",
        element:<Create />
      },
    ]
  },
]);
function App() {
  const[firstid,setFirstId]=useState(null)
  return (
    <RouterProvider router={router} />
  );
}

export default App