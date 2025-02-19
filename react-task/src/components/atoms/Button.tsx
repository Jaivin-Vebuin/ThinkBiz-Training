import React from "react";

interface ButtonPropsType {
  text: string;
  handleOnClick: () => {};
  isDisabled: boolean;
}



const Button:React.FC<ButtonPropsType> = ({ text, handleOnClick, isDisabled }) => {
  return (
    <>
      <button onClick={handleOnClick} disabled={isDisabled}>{text}</button>
    </>
  );
};

export default Button;
