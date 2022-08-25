import React from "react";
import GistDetails from "../components/GistDetails";
import { getUserGists } from "../apiCall";
import InputField from "../components/InputField";
import GistCodeComponent from "../components/GistCodeComponent";
import { useEffect, useState } from "react";

const UserGists = () => {
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
        <div>
          {userGists.map((gistData) => {
            const filesList = Object.keys(gistData.files)[0];
            const codeUrl = gistData.files[filesList].raw_url;
            return (
              <div
                key={gistData.id}
                className="userGist"
                style={{ padding: "25px 0px" }}
              >
                <div className="userGistNav flex">
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
                <div className="card gistCodeWrapper">
                  <GistCodeComponent codeUrl={codeUrl} gridPage={true} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserGists;
