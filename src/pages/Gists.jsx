import React, { useEffect, useState } from "react";
import GistsList from "./GistsList";
import "./Gists.css";
import { getPublicGists } from "../apiCall";

const Gists = () => {
  const [display, setDisplay] = useState("List");
  const [gistsData, setGistsData] = useState([]);
  const [pageInput, setPageInput] = useState("1");

  {
    /* making api call to get list of public gists from 
    api, when the component renders this api call will 
    be made data will be fetched from api and we are setting
    this data in component local state */
  }
  useEffect(() => {
    getPublicGists().then((response) => {
      // console.log("Making Api Call");
      setGistsData(response);
    });
  }, []);

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);

  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(6);

  // need the indices of the first and last record on the current page.
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const currentRecords = gistsData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calculate the number of pages
  const nPages = Math.ceil(gistsData.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
      setPageInput(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setPageInput(currentPage - 1);
    }
  };

  {
    /* This function will check is current page is equal to first 
      and last page number if condition is true then it will 
      disable the button. Proviing to first and last page as
      argument */
  }
  const disableBtn = (pageNum) =>
    parseInt(currentPage) === pageNum ? "disabled" : "";

  const handlePageInput = (e) => {
    const val = e.target.value;
    if (parseInt(val) > nPages || parseInt(val) <= 0) {
      setPageInput(nPages);
      return;
    }
    setPageInput(val);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      if (e.target.value.length !== 0) {
        setCurrentPage(pageInput);
      }
    }
  };

  return (
    <div className="container Gists">
      <div className="toogleDisplay" style={{ margin: "10px" }}>
        <button className="toggleButtons" onClick={() => setDisplay("Grid")}>
          <i className="fa fas fa-th-large"></i>
        </button>

        <span className="separator">|</span>

        <button className="toggleButtons" onClick={() => setDisplay("List")}>
          <i className="fa fal fa-list-ul"></i>
        </button>
      </div>

      {/* This will check if layout is set to grid or list
       and will display accordingly. We are passing the data we 
       saved in component local state to these component as props */}

      {display === "Grid" && <div>Grid Display</div>}
      {display === "List" && <GistsList gistsData={currentRecords} />}

      <footer className="footer">
        <button
          className="btn nxtPageBtn"
          onClick={nextPage}
          disabled={disableBtn(nPages)}
        >
          Next Page
          <span>
            <i className="fa fal fa-arrow-right"></i>
          </span>
        </button>

        <div className="paginationBtns">
          <span>Page</span>
          <input
            type="number"
            value={pageInput}
            className="paginationInput"
            onChange={(e) => handlePageInput(e)}
            onKeyUp={
              (e) => handleEnterKey(e)
              // e.key === "Enter" || e.keyCode === 13 ? setCurrentPage(pageInput) : ""
            }
          />
          <span>of {nPages}</span>
          <button className="btn" onClick={prevPage} disabled={disableBtn(1)}>
            <i className="fa fas fa-chevron-left pagination-arrow"></i>
          </button>
          <button
            className="btn"
            onClick={nextPage}
            disabled={disableBtn(nPages)}
          >
            <i className="fa fas fa-chevron-right pagination-arrow"></i>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Gists;
