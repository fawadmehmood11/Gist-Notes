import React from "react";
import styled, { keyframes } from "styled-components";

const SpinnerAnimations = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #5acba1;
  border-top: 5px solid #8effd2; /* Blue */
  border-radius: 50%;
  animation: ${SpinnerAnimations} 1.5s linear infinite;
`;

const SpinnerContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner> </Spinner>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
