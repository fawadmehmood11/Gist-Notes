import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [searchVal, setSearchVal] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = `${process.env.REACt_APP_BASEURL}${process.env.REACT_APP_CLIENT_ID}`;
  };

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <nav>
      <div className="container navContent flex">
        <div className="logoContainer">
          <div>
            <Link to="/" className="logoWrapper flex">
              <img src={logo} alt="" />
              <span>MUMBA</span>
            </Link>
          </div>
        </div>

        <div>
          <form className="flex">
            <div className="searchBar flex">
              <input
                type="search"
                placeholder="Search Notes..."
                value={searchVal}
                onChange={handleSearch}
              />
              <i className="fa fas fa-search"></i>
            </div>
            <button className="btn btnLogin" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
