import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { getAuthorizedUser, logOutUser } from "../utils";
import ProfileAvatar from "../components/ProfileAvatar";
const Navbar = () => {
  const [searchVal, setSearchVal] = useState("");
  const [showDropDown, setShowDropDownVal] = useState(false);

  const userDetails = getAuthorizedUser();

  console.log("userDetails", userDetails);

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = `${process.env.REACt_APP_BASEURL}${process.env.REACT_APP_CLIENT_ID}`;
  };

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const dropDownClicked = () => {
    console.log(!showDropDown);
    setShowDropDownVal(!showDropDown);
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

        <div className="flex">
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

            {!userDetails && (
              <button className="btn btnLogin" onClick={handleLogin}>
                Login
              </button>
            )}
          </form>
          {userDetails && (
            <div
              className="dropDown"
              style={{
                width: "35px",
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={dropDownClicked}
            >
              <ProfileAvatar avatarUrl={userDetails.avatar_url} />

              <div
                className={
                  "dropDownContent flexColumn " +
                  (showDropDown ? "showDropDown" : "")
                }
              >
                <div className="dropDownItem flexColumn">
                  <p className="flexColumn">
                    <span>Signed in as</span> <span>{userDetails.login}</span>
                  </p>
                  {/* <p></p> */}
                </div>
                <div className="dropDownItem item-2 flexColumn">
                  <Link to={""}>Your gists</Link>
                  <Link to={""}>Satrred gists</Link>
                  <Link to={""}>Help</Link>
                </div>
                <div className="dropDownItem flexColumn">
                  <p>Your GitHub Profile</p>
                  <button className="btn" onClick={() => logOutUser()}>
                    Sign Out
                  </button>
                </div>
              </div>
              <div
                className={
                  "DropDownToolTip " + (showDropDown ? "showDropDown" : "")
                }
              ></div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
