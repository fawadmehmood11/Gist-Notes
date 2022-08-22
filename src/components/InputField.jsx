import React from "react";
import styled, { css } from "styled-components";

const Input = styled.input`
  width: 40px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid gray;
  font-family: "Saira Semi Condensed", sans-serif;
  color: #959d9a;
  font-size: 12px;
  text-align: center;
  outline: none;
  ${(props) =>
    props.shouldFocus ? `&:focus {   border: 1px solid #5acba1;  }` : ""}
`;

// &:focus {
//     border: ${(props) => (props.shouldHover ? "1px solid #5acba1" : "")};
//   }

const InputField = (props) => {
  const { value, onChange, onKeyUp } = props;
  const isOnChange = Boolean(onChange);
  const isOnKeyUp = Boolean(onKeyUp);

  return (
    <Input
      type="number"
      value={value}
      onChange={isOnChange ? onChange : ""}
      onKeyUp={isOnKeyUp ? onKeyUp : undefined}
    />
  );
};

export default InputField;
