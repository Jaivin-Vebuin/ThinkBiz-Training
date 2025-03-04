import React from "react";

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
        id={htmlFor}
        name={name}
        value={value}
        onChange={handleOnChange}
        type={inputType}
        placeholder={placeholder}
        {...registerProps}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
    </div>
  );
};

export default Input;
