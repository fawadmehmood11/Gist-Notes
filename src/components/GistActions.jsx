import React from "react";
import styled from "styled-components";
import InputField from "./InputField";
const GistActionButtons = styled.button`
  color: #0773ff;
  background-color: transparent;
  margin: 0px 10px;
  font-size: 16px;
  font-weight: normal;
  &:hover {
    box-shadow: none;
  }
`;

const GistActions = ({ props }) => {
  return (
    <>
      <GistActionButtons className="btn">
        <i className="fa fa-star-o"></i> Stars
        <InputField
          value={props.inputValue}
          //   onChange={(e) => handleInputChange(e, setStars)}
        />
      </GistActionButtons>
      <GistActionButtons className="btn">
        <i className="fa far fa-code-fork"></i>
        Frok
        <InputField
        //   inputValue={forks}
        //   onChange={(e) => handleInputChange(e, setForks)}
        />
      </GistActionButtons>
    </>
  );
};

export default GistActions;
