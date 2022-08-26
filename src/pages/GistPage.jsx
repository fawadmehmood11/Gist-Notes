import React, { useEffect, useState } from "react";
import "./styling/GistPage.css";
import { useParams } from "react-router-dom";
import { getGistById, forkGist } from "../apiCall";
import GistCodeComponent from "../components/GistCodeComponent";
import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";
import GistDetails from "../components/GistDetails";
import { getAuthorizedUser } from "../utils";

const GistPage = () => {
  const { gistId } = useParams();
  const [gistData, setGistData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);

  let filesList = "";
  let fileName = "";
  let codeUrl = "";

  useEffect(() => {
    getGistById(gistId).then((response) => {
      if (response) {
        console.log("checking refresh");
        setGistData(response);
        setIsLoaded(true);
      }
    });
  }, [gistId]);

  if (gistData && isLoaded) {
    filesList = Object.keys(gistData.files)[0];
    fileName = gistData.files[filesList].filename.substring(0, 15);
    codeUrl = gistData.files[filesList].raw_url;
  }

  const forkClicked = () => {
    console.log("hha");
  };

  const handleInputChange = (e, changeType) => changeType(e.target.value);
  const Spinner = !isLoaded ? <LoadingSpinner /> : "";
  return (
    <>
      {Spinner}
      {isLoaded && gistData && (
        <div className="container gistsCode">
          <div className="header flex">
            <GistDetails gistData={gistData} />
            <div className="gistAction">
              {getAuthorizedUser() && (
                <>
                  <button className="btn btnGistAction">
                    <i className="fa far fa-edit"></i>
                    Edit
                  </button>
                  <button className="btn btnGistAction">
                    <i className="fa far fa-trash-o"></i>
                    Delete
                  </button>
                </>
              )}
              <button className="btn btnGistAction">
                <i className="fa fa-star-o"></i> Stars
                <InputField
                  value={stars}
                  onChange={(e) => handleInputChange(e, setStars)}
                />
              </button>
              <button
                className="btn btnGistAction"
                onClick={() => forkClicked()}
              >
                <i className="fa far fa-code-fork"></i>
                Frok
                <InputField
                  value={forks}
                  onChange={(e) => handleInputChange(e, setForks)}
                />
              </button>
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
            <GistCodeComponent codeUrl={codeUrl} gridPage={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default GistPage;
