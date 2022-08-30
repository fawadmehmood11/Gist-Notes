import React, { useState, useContext, useRef } from "react";
import { readGistCode, updateGist } from "../apiCall";
import { useEffect } from "react";
import { UserContext } from "../context/GistContext";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const GistCodeComponent = () => {
  const { codeUrl, gridPage, edit, fileName, gistId } = useContext(UserContext);
  const [gistCode, setGistCode] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    readGistCode(codeUrl).then((response) => {
      if (response && gridPage) {
        setGistCode(response.split("\n").slice(0, 5));
        return;
      }

      if (response && !gridPage) {
        setGistCode(response.split("\n"));
        return;
      }
    });
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setGistCode(val.split("\n"));
  };
  const isPadding = !gridPage ? "padding" : "";

  const updatesGist = () => {
    let data = {
      description: "Update to Gist",
      files: {},
    };
    data["files"][fileName] = {
      content: JSON.stringify(gistCode),
    };
    updateGist(gistId, data, localStorage.getItem("token"))
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        showModalBox();
        console.log(err.message);
        setErrorMessage(err.message);
      });
  };

  const hideModal = () => {
    setShowModal(false);
    navigate(`/gist/${gistId}`);
  };

  const showModalBox = () => {
    setShowModal(true);
  };

  return (
    <div className="gistCode">
      <Modal show={showModal} handleClose={hideModal} err={errMessage} />
      {!edit && (
        <ol>
          {gistCode &&
            gistCode
              .filter((line) => line)
              .map((line, index) => (
                <li key={index}>
                  {gridPage ? (
                    <span>{line.substring(0, 30)}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </li>
              ))}
        </ol>
      )}
      {edit && (
        <div>
          <textarea
            value={gistCode.join("\n")}
            rows={gistCode.length}
            onChange={(e) => handleChange(e)}
          />
          <button className="btn updateGistBtn" onClick={() => updatesGist()}>
            Update Gist
          </button>
        </div>
      )}
    </div>
  );
};

export default GistCodeComponent;
