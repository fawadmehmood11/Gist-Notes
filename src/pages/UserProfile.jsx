import React, { useEffect, useState } from "react";
import ProfileAvatar from "../components/ProfileAvatar";
import GistDetails from "../components/GistDetails";
import { getUserGists } from "../apiCall";
import InputField from "../components/InputField";
import GistCodeComponent from "../components/GistCodeComponent";
import "./styling/UserProfile.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const UserProfile = () => {
  const [userGists, setUserGists] = useState([]);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);

  useEffect(() => {
    getUserGists(localStorage.getItem("token")).then((response) => {
      if (response) {
        setUserGists(response);
      }
    });
  }, []);

  const handleInputChange = (e, changeType) => changeType(e.target.value);

  return (
    <div>
      {userGists.length > 0 && (
        <div className="container">
          <div className="userProfile flex">
            <div className="userInfo flexColumn">
              <div className="profileImgContainer" style={{ width: "250px" }}>
                <ProfileAvatar avatarUrl={userGists[0].owner.avatar_url} />
              </div>
              <p>{userGists[0].owner.login}</p>
              <button className="btn">View GitHub Profile</button>
            </div>
            <div className="userGistsContainer">
              <div className="sectionNav">
                <Link to="/user">All Gists</Link>
                <Link to="starred">Starred Gists</Link>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
