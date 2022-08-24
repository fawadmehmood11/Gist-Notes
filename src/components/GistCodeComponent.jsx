import React, { useState } from "react";
import { readGistCode } from "../apiCall";
import { useEffect } from "react";

const GistCodeComponent = ({ codeUrl, gridPage }) => {
  const [gistCode, setGistCode] = useState("");
  useEffect(() => {
    readGistCode(codeUrl).then((response) => {
      // console.log("ReponseType from GistCode ", typeof response);
      if (response && gridPage) {
        // console.log("From Grid Page", gridPage);
        setGistCode(response.split("\n").slice(0, 5));
        return;
      }

      if (response && !gridPage) {
        // console.log("Not from Grid Page", gridPage);
        setGistCode(response.split("\n"));
        return;
      }
    });
  }, []);

  const isPadding = !gridPage ? "padding" : "";

  return (
    <div className="gistCode">
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
    </div>
  );
};

export default GistCodeComponent;
