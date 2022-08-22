import React, { useEffect, useState } from "react";
import "./styling/GistPage.css";
import { useParams, Link } from "react-router-dom";
import { getGistById } from "../apiCall";
import ProfileAvatar from "../components/ProfileAvatar";
import GistCodeComponent from "../components/GistCodeComponent";
import { parseISO, formatDistanceToNow } from "date-fns";
import InputField from "../components/InputField";

const GistPage = () => {
  const { gistId } = useParams();
  const [gistData, setGistData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);

  let filesList = "";
  let fileName = "";
  let date = "";
  let timePeriod = "";
  let timeAgo = "";
  let codeUrl = "";

  useEffect(() => {
    getGistById(gistId).then((response) => {
      if (response) {
        setGistData(response);
        setIsLoaded(true);
      }
    });
  }, []);

  if (gistData && isLoaded) {
    filesList = Object.keys(gistData.files)[0];
    fileName = gistData.files[filesList].filename.substring(0, 15);
    codeUrl = gistData.files[filesList].raw_url;
    date = parseISO(gistData.created_at);
    timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  const handleInputChange = (e, changeType) => changeType(e.target.value);

  return (
    <>
      {isLoaded && gistData && (
        <div className="container gistsCode">
          <div className="header flex">
            <div className="gistDetails">
              <Link
                to={`/gist/${gistData.id}`}
                style={{ width: "35px", display: "inline-block" }}
              >
                <ProfileAvatar avatarUrl={gistData.owner.avatar_url} />
              </Link>
              <div className="gistInfo">
                <p className="GistFileName">
                  <span></span> {gistData.owner.login} / <span>{fileName}</span>
                </p>
                <p className="GistFileDate">Created {timeAgo}</p>
              </div>
            </div>
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
          <div className="gistContainer">
            <div className="gistHeader">
              <p className="gistFile">
                <span className="fileIcon">
                  <i className="fa fas fa-code"></i>
                </span>
                <span className="fileName">{fileName}</span>
              </p>
            </div>
            <GistCodeComponent codeUrl={codeUrl} gistId={gistData.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default GistPage;
