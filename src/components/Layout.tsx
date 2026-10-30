import { Outlet } from "react-router-dom";
import BlogNavbar from "./BlogNavbar";


export default function Layout() {
  return (
   <>
    <BlogNavbar/>
    <Outlet></Outlet>
   </>
  )
}
