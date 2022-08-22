import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGistById } from "../apiCall";
import ProfileAvatar from "../components/ProfileAvatar";

const GistPage = () => {
  const { gistId } = useParams();
  console.log(gistId);
  const [gistData, setGistData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getGistById(gistId).then((response) => {
      console.log("Response", response);
      setGistData(response);
      setIsLoaded(true);
    });
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="container">
          <div className="header">
            <div className="gistDetails">
              <Link
                to={`/gist/${gistData.id}`}
                style={{ width: "35px", display: "inline-block" }}
              >
                <ProfileAvatar avatarUrl={gistData.owner.avatar_url} />
              </Link>
              <div className="gistInfo">
                <p>
                  <span></span> / <span></span>
                </p>
                <p>craeted 7 hours Ago</p>
              </div>
            </div>
            <div className="gistAction"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default GistPage;
