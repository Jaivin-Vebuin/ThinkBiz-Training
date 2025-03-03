import React from "react";

interface OptionPropsType {
  value: string;
  label: string;
}

const Option: React.FC<OptionPropsType> = ({ value, label }) => {
  return (
    <>
      <option value={value}>{label}</option>;
    </>
  );
};

export default Option;
