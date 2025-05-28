import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function Header() {
  return (
    <div className="hederbaar">
      <div className="header_mani">
        <div className="logo">
          <img
            src="https://moviex-olive.vercel.app/assets/movix-logo-d720c325.svg"
            alt="Logo"
            className=""
          />
        </div>
        <ul className="tvsearch">
          <li><a href="">Movies</a></li>
          <li><a href="">TV Shows</a></li>
          <span className=""><IoSearchOutline /></span>
        </ul>
      </div>
    </div>
  );
}

export default Header;




