
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/auth.context";
import { toast } from "react-toastify";

export default function BlogNavbar() {
  const context = useContext(authContext);
  const navigate  = useNavigate()
  if(!context)
    throw new Error

    const {setLogin ,user} = context;
      

  function Logout(){
     localStorage.removeItem('tkn')
            setLogin(null)
            toast.success('logout was successfull')
            navigate('/')
  }
  
  return (
    <Navbar fluid rounded>
   <div className="container flex flex-wrap justify-between items-center">
       <NavbarBrand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </NavbarBrand>
      <div className="flex md:order-2 items-center">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user?.photo} rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user?.username}</span>
            <span className="block truncate text-sm font-medium">{user?.email}</span>
          </DropdownHeader>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Setting</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={Logout}>Logout</DropdownItem>
        </Dropdown>
        <NavbarToggle />
        <span className="text-white capitalize">{user?.username}</span>
      </div>
      <NavbarCollapse>
       <Link to = {'/feed'} className="text-white"> 
          Feed
       </Link>     
        <Link to = {'/profile'} className="text-white"> 
          Profile
       </Link> 
        <Link to = {'/'} className="text-white"> 
          Notification
       </Link> 
      </NavbarCollapse>
   </div>
    </Navbar>
  );
}
