import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <h1 className="header_logo">NETFLIX</h1>
      <div className="header_nav">
        <span>Home</span>
        <span>TV Shows</span>
        <span>Movies</span>
        <span>Latest</span>
        <span>My List</span>
      </div>
    </div>
  );
}

export default Header;