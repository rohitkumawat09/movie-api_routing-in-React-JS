import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="hederbaar">
      <div className="header_mani">
        <div className="logo">
        <Link to="/">
            <img
              src="https://moviex-olive.vercel.app/assets/movix-logo-d720c325.svg"
              alt="Logo"
              className=""
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
        <ul className="tvsearch">

          <Link to="/Allmovies"><li>Movies</li></Link>
          <Link to="/TvShows"><li>TV Shows</li></Link>

          <span className=""><IoSearchOutline /></span>
        </ul>
      </div>
    </div>
  );
}

export default Header;




