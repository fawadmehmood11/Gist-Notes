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
  const [userssGists, setUserGists] = useState([]);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([getUserGists(token), userStarredGists(token)]).then(
      (response) => {
        const [userGists, starredGists] = response;
        setUserGists(userGists);
        dispatch(addUserGists(userGists));
        dispatch(addStarredGists(starredGists));
      }
    );
  }, []);

  const handleInputChange = (e, changeType) => changeType(e.target.value);

  return (
    <div>
      {userssGists.length > 0 && (
        <div className="container">
          <div className="userProfile flex">
            <div className="userInfo flexColumn">
              <div className="profileImgContainer" style={{ width: "250px" }}>
                <ProfileAvatar avatarUrl={userssGists[0].owner.avatar_url} />
              </div>
              <p>{userssGists[0].owner.login}</p>
              <button className="btn">View GitHub Profile</button>
            </div>
            <div className="userGistsContainer">
              <div className="sectionNav">
                <NavLink
                  end
                  to="/user"
                  className={({ isActive }) =>
                    isActive ? "activeLink" : undefined
                  }
                >
                  All Gists
                </NavLink>
                <NavLink
                  to="starred"
                  className={({ isActive }) =>
                    isActive ? "activeLink" : undefined
                  }
                >
                  Starred Gists
                </NavLink>
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
