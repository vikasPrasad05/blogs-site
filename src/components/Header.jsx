import React from 'react'
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import logo from './../assets/logo.jpg'
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaCircleUser } from "react-icons/fa6";




function Header() {

  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) { 
        setPageState(<FaCircleUser className='icon' /> );
      } else {
        setPageState(<FaUser className='icon'/>);
      }
    });
  }, [auth]);
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  
  return (
    <nav className="navbar className='bg-white border-b shadow-sm sticky top-0 x-50 z-50'">
    <div className="navbar-container">
      <div className="navbar-logo">
        <a href=""><img src={logo} /></a>
      </div>
      <ul className="navbar-links">
        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
        pathMatchRoute("/") && "text-black border-b-red-500"
        }`}
        onClick={()=>navigate('/')} 
        >Home</li>

        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/Blogs") && "text-black border-b-red-500"
              }`}
        onClick={()=>navigate('/Blogs')} 
        >
          Blogs</li>

        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/About") && "text-black border-b-red-500"
              }`}
        onClick={()=>navigate('/About')}
        >About</li>

        <li className={`cursor-pointer py-3 text-sm font-semibold     text-gray-400 border-b-[3px] border-b-transparent ${
          (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
            "text-black border-b-red-500"
            
              }`}
        onClick={()=>navigate('/profile')} >
        
        {pageState}
        </li>
      </ul>
    </div>
  </nav>
  )
}

export default Header