import React from "react";
import styled from "styled-components";

const ModalCon = styled.section`
  position: fixed;
  background: #5acba1;
  width: fit-content;
  padding: 20px 25px;
  height: auto;
  bottom: 2%;
  right: 2%;
  border-radius: 5px;
  color: white;
  //   transform: translate(-50%, -50%);
`;

const Modal = ({ handleClose, show, err }) => {
  const showHideClassName = show ? "display-block" : "display-none";
  return (
    // <StyledModel className={showHideClassName}>
    <ModalCon className={`modal-main ${showHideClassName}`}>
      <button onClick={handleClose} className="btn modalCloseBtn">
        <i className="fa fa-times"></i>
      </button>
      <p>{err}</p>
    </ModalCon>
    // </StyledModel>
  );
};

export default Modal;
