import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <Link to="/browse">
          <img 
            className="header__logo" 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
            alt="Netflix Logo" 
          />
        </Link>
        
        {/* 👇 አሁን እነዚህ ሊንኮች ሲነኩ ገጹን በትክክል ይቀይሩታል */}
        <div className="header__nav">
          <Link to="/browse" className="header__link">Home</Link>
          <Link to="/tvshows" className="header__link">TV Shows</Link>
          <Link to="/movies" className="header__link">Movies</Link>
          <Link to="/latest" className="header__link">Latest</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;