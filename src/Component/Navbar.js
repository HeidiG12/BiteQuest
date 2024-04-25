import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./StyleSheets/Navbar.css";
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import logo from '../assets/logo.png';
import types from "./imgs/dif_types.png";
import profileIcon from "./imgs/profileIcon.png";

function Navbar() {
  // State to handle the toggle of the menu
  const [toggleMenu, setToggleMenu] = useState(false);

  // State to track and set the active menu item
  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem('activeItem') || null;
  });

  // Effect to store the active item in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('activeItem', activeItem);
  }, [activeItem]);

  // Function to handle item click, sets the active item and color
  const handleItemClick = (itemName) => {
    setActiveItem(itemName)
    setColor(itemName);
  };

  // Function to set the color, currently only returns red color
  const setColor = (itemName) => ({
    color:'red'
  });

  // Profile SVG icon setup
  const profileSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-2 3-6 3s-6-2-6-3c0-1 2-3 6-3s6 2 6 3zm-1-.004c-.29-.997-1.826-2.996-5-2.996s-4.71 2-5 2.996C4.29 12.999 5.826 11 9 11s4.71 2 5 2.996z"/>
    </svg>
  );

  // The component renders the navigation bar with a responsive design.
  return (
    //start of the nav bar
    <div style={{ maxWidth: '100%', 'padding-left':'100px','padding-right ':'100px','padding-bottom':'10px'}}> {/* This div acts as the container */}
      
      {/* first column of the navbar starts here*/}
      <div style={{ display: 'flex', justifyContent: 'space-between', 'gap':'px'}}> {/* Second row */}
      {/* <div style={{ display: 'flex', 'align-items': 'left','padding-top':'20px' }}>  */}
      
      {/* First column */}
        <div className= "logo" style={{ width: '23%' }}>
        <Link to="/" className={''} onClick={() => handleItemClick('logo')}><img src={logo} alt="logo"  style={{ width: '50%','align-items':'left' }}/></Link>        
        </div>

      {/* second column */}
        <div style={{ width: '33%', display: 'flex', justifyContent: 'flex-end','padding-top':'15px','padding-right':'60px'}}> 
          <Link to="/profile" onClick={() => handleItemClick('profile')}>
            <img src={profileIcon} alt="logo" style={{ width: '45px' }}/>
          </Link>        
        </div>
      </div>
          
      <div style={{ display: 'flex', 'padding-left':'100px','padding-right':'100px' }}> {/* Second row */}
        <div style={{ width: '20%' }}>
          <Link to="/entries" className="nav-link">Entries</Link>
        </div>
        <div style={{ width: '20%' }}>
          <Link to="/friends" className="nav-link">Friends</Link>
        </div>
        <div style={{ width: '20%' }}>
          <Link to="/review" className="nav-link">Make a Review</Link>
        </div>
        <div style={{ width: '20%' }}>
          <Link to="/search" className="nav-link">Search</Link>
        </div>
      </div>
    </div>
  );
}

// Export the Navbar component
export default Navbar
