import React, { useEffect, useState } from "react";
import ProfileAvatar from "../components/ProfileAvatar";
import GistDetails from "../components/GistDetails";
import { getUserGists, userStarredGists } from "../apiCall";
import "./styling/UserProfile.css";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserGists, addStarredGists } from "../features/userSlice";
const UserProfile = () => {
  const [userGists, setUserGists] = useState([]);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([getUserGists(token), userStarredGists(token)]).then(
      (response) => {
        const [userGist, starredGists] = response;
        setUserGists(userGist);
        dispatch(addUserGists(userGists));
        dispatch(addStarredGists(starredGists));
        console.log(userGist, starredGists);
      }
    );
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
                <NavLink to="/user">All Gists</NavLink>
                <NavLink to="starred">Starred Gists</NavLink>
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
