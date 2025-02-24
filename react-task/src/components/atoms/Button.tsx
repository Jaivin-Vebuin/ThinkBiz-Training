import React from "react";

interface ButtonPropsType {
  text: string;
  handleOnClick: () => void;
  isDisabled?: boolean;
}



const Button:React.FC<ButtonPropsType> = ({ text, handleOnClick, isDisabled }) => {
  return (
    <>
      <button onClick={handleOnClick}>{text}</button>
    </>
  );
};

export default Button;
