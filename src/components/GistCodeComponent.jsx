import React, { useState } from "react";
import { readGistCode } from "../apiCall";
import { useEffect } from "react";

const GistCodeComponent = ({ codeUrl, gistId }) => {
  const [gistCode, setGistCode] = useState("");
  useEffect(() => {
    readGistCode(codeUrl).then((response) => {
      if (response) {
        setGistCode(response);
      }
    });
  }, []);

  return (
    <div className="gistCode">
      <ol>
        {gistCode
          .split("\n")
          .filter((line) => line)
          .map((line) => (
            <li key={gistId}>
              <span>{line}</span>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default GistCodeComponent;
