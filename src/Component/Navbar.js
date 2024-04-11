import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./StyleSheets/Navbar.css";
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import logo from '../assets/logo.png';
import types from "./imgs/dif_types.png";
import profileIcon from "./imgs/profileIcon.png";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem('activeItem') || null;
  });

  useEffect(() => {
    localStorage.setItem('activeItem', activeItem);
  }, [activeItem]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName)
    setColor(itemName);
  };

  const setColor = (itemName) => ({
    color:'red'
  });




  const handleSearch = (query) => {
    // if (!query.trim()) {
    //   setSearchResults(items);
    //   return;
    // }
    // const filteredItems = items.filter(item =>
    //   item.toLowerCase().includes(query.toLowerCase())
    // );
    // setSearchResults(filteredItems);
  };
  const magnifyingGlassSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.03.062.058.095.083l.007.006.002.002a.977.977 0 0 0 .128.115l4.516 4.517a.5.5 0 0 0 .708-.708l-4.517-4.516a.977.977 0 0 0-.115-.128l-.002-.002-.006-.007a.977.977 0 0 0-.083-.094v-.001zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>
  );
  const profileSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-2 3-6 3s-6-2-6-3c0-1 2-3 6-3s6 2 6 3zm-1-.004c-.29-.997-1.826-2.996-5-2.996s-4.71 2-5 2.996C4.29 12.999 5.826 11 9 11s4.71 2 5 2.996z"/>
    </svg>
  
  );

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
      <div style={{ width: '44%' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
          <input
             type="text"
              placeholder="Search for somewhere..."
              style={{
                flexGrow: 1,
                padding: '5px 25px', // Adjust padding as needed
                fontSize: '15px',
                borderRadius: '10px', // Makes it rounded
                border: '1px solid orange', // Example border color
                backgroundColor: 'white', // Orange background
                color: 'black', // Text color
                marginRight: '0px', // Add space between input and button                
                }}
              />
            <button type="submit" style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                {magnifyingGlassSVG}
            </button>
          </form>

  
      </div>
        <div style={{ width: '33%', display: 'flex', justifyContent: 'flex-end','padding-top':'15px','padding-right':'60px'}}> 
          <Link to="/profile" onClick={() => handleItemClick('profile')}>
            <img src={profileIcon} alt="logo" style={{ width: '45px' }}/>
          </Link>        
        </div>
      </div>


      <div style={{ display: 'flex', 'padding-left':'100px','padding-right':'100px' }}> {/* Second row */}
        <div style={{ width: '33%' }}>
          <Link to="/entries" className="nav-link">Entries</Link>
        </div>
          
        <div style={{ width: '33%' }}>
          <Link to="/journal" className="nav-link">Write a Review</Link>
          </div>
        <div style={{ width: '33%' }}>
          <Link to="/friends" className="nav-link">Friends</Link>
        </div>
      </div>



    </div>
  );
}


export default Navbar