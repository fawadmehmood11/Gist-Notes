import React from "react";
import GistCodeComponent from "../components/GistCodeComponent";
import GistDetails from "../components/GistDetails";
import "./styling/GistsGrid.css";

const GistsGrid = ({ gistsData }) => {
  return (
    <div className="container">
      <div className="cardsContainer">
        {gistsData.map((data) => {
          const filesList = Object.keys(data.files)[0];
          const codeUrl = data.files[filesList].raw_url;
          return (
            <>
              <div className="card" key={data.id}>
                <GistCodeComponent codeUrl={codeUrl} gridPage={true} />
                <GistDetails gistData={data} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default GistsGrid;
