import React from "react";
import { ErrorFieldStyle } from "../styles/AuthFormStyles";

interface InputProps {
  name: string;
  value?: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  inputType: string;
  labelText: string;
  htmlFor: string;
  registerProps?: any;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  handleOnChange,
  inputType,
  placeholder,
  labelText,
  htmlFor,
  registerProps,
  error,
}) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{labelText}</label>
      <input
        name={name}
        value={value}
        onChange={handleOnChange}
        type={inputType}
        placeholder={placeholder}
        {...registerProps}
      />
      {error && (
        <ErrorFieldStyle>
          <p>{error}</p>
        </ErrorFieldStyle>
      )}
    </div>
  );
};

export default Input;
