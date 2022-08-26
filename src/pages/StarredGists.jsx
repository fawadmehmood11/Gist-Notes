import React, { useState } from "react";
import InputField from "../components/InputField";
import GistCodeComponent from "../components/GistCodeComponent";
import GistDetails from "../components/GistDetails";
import { getStarredGists } from "../features/userSlice";
import { useSelector } from "react-redux";

const StarredGists = () => {
  const starredGists = useSelector(getStarredGists);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);

  const handleInputChange = (e, changeType) => changeType(e.target.value);

  return (
    <div>
      {starredGists.length > 0 ? (
        <div>
          {starredGists.map((gistData) => {
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
      ) : (
        <h6>Gists Not Available</h6>
      )}
    </div>
  );
};

export default StarredGists;
