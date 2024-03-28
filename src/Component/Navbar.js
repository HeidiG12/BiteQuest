import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import logo from '../assets/logo.png';
import types from "./imgs/dif_types.png";

const Navbar = () => {  
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

//for slack icon
//npm install --save-dev @iconify/react @iconify/icons-mdi
//slack invite link expires after 30 days
  return (
    <div className = "navbar">

      <div className="logo">
          <Link to="/" className={''} onClick={() => handleItemClick('logo')}><img src={logo} alt="logo" /></Link>
      </div>

      <div className = "links">
        <Link to="/entries" className={activeItem === 'entries' ? 'active' : ''} onClick={() => handleItemClick('entries')}>Entries</Link>
        <Link to="/journal" className={activeItem === 'journal' ? 'active' : ''} onClick={() => handleItemClick('journal')}>Journal</Link>
        <Link to="/friends" className={activeItem === 'friends' ? 'active' : ''} onClick={() => handleItemClick('friends')}>Friends</Link>
      </div>

      <div className= "types">
        <img src={types} alt="different types of foods" />
      </div>

      <div className="menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className="menuContainer">
            <div className="menulinks">
            <Link to="/entries" className={activeItem === 'entries' ? 'active' : ''} onClick={() => handleItemClick('entries')}>Entries</Link>
            <Link to="/journal" className={activeItem === 'journal' ? 'active' : ''} onClick={() => handleItemClick('journal')}>Journal</Link>
            <Link to="/friends" className={activeItem === 'friends' ? 'active' : ''} onClick={() => handleItemClick('friends')}>Friends</Link>
            </div>
          </div>
        )}
      </div>
      
  </div>
  )
}

export default Navbar