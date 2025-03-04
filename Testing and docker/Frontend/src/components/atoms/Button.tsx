import React from "react";

interface ButtonPropsType {
  text: string;
  handleOnClick: () => void;
  isDisabled?: boolean;
}

const Button:React.FC<ButtonPropsType> = ({ text, handleOnClick, isDisabled=false }) => {
  return (
    <>
      <button  onClick={handleOnClick} disabled={isDisabled}>{text}</button>
    </>
  );
};

export default Button;
