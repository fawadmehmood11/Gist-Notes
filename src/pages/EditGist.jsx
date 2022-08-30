import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import GistCodeComponent from "../components/GistCodeComponent";
import { getGistById } from "../features/userSlice";
import { UserContext } from "../context/GistContext";

const EditGist = () => {
  const { gistId } = useParams();
  const gist = useSelector((state) => getGistById(state, gistId));
  let filesList;
  let fileName;
  let codeUrl;
  const gridPage = false;
  const edit = true;
  if (gist) {
    filesList = Object.keys(gist.files)[0];
    fileName = gist.files[filesList].filename.substring(0, 15);
    codeUrl = gist.files[filesList].raw_url;
  }

  return (
    <div style={{ textAlign: "center" }}>
      {gist ? (
        <UserContext.Provider
          value={{ codeUrl, gridPage, edit, fileName, gistId }}
        >
          <GistCodeComponent />
        </UserContext.Provider>
      ) : (
        <h3>No Gist Found</h3>
      )}
    </div>
  );
};

export default EditGist;
