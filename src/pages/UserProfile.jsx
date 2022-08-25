import React, { useEffect, useState } from "react";
import ProfileAvatar from "../components/ProfileAvatar";
import GistDetails from "../components/GistDetails";
import { getUserGists } from "../apiCall";
import InputField from "../components/InputField";

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
          <div>
            <div className="userInfo">
              <div className="profileImgContainer" style={{ width: "250px" }}>
                <ProfileAvatar avatarUrl={userGists[0].owner.avatar_url} />
              </div>
              <p>{userGists[0].owner.login}</p>
              <button className="btn">View GitHub Profile</button>
            </div>
            <div className="userGistsContainer">
              {userGists.map((gistData) => {
                return (
                  <div className="userGists flex">
                    <GistDetails gistData={gistData} />
                    <div className="gistAction">
                      <span>
                        <i className="fa fa-star-o"></i> Stars
                        <InputField
                          value={stars}
                          onChange={(e) => handleInputChange(e, setStars)}
                        />
                      </span>
                      <span>
                        <i className="fa far fa-code-fork"></i>
                        Frok
                        <InputField
                          value={forks}
                          onChange={(e) => handleInputChange(e, setForks)}
                        />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
