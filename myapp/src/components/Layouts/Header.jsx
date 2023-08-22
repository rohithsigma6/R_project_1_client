import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';
const Header = ({children}) => {
  return (
    <div>
    <header className="header">
      <div className="logo">Ecomm Store</div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
       
        </ul>
      </nav>

    </header>
    {children}
    </div>
  );
};

export default Header;
