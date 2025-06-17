import React, { useState } from 'react';
import './Header.css';
import BaggyBuyLogo from '../../../assets/baggy-buy-logo-white.png';
import { FaHome, FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navbar'>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        ☰
      </button>
      <div className={`overlay ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleNavbar}>
          &times;
        </button>
        <div className="overlay-content">
          <img src={BaggyBuyLogo} alt="Baggy Buy Logo" className='logo'/>

          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>

          <div className="navIcons">
            <a href="/search">
              <FaSearch size={30} />
            </a>
            <a href="/cart">
              <FaShoppingCart size={30} />
            </a>
            <a href="/">
              <FaHome size={30} />
            </a>
            <a href="/login">
              <FaUser size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
