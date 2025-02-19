// Option.tsx
import React from "react";
// import {store} from '../../redux/store/store';

interface OptionPropsType {
  value: string;
  label: string;
}

const Option: React.FC<OptionPropsType> = ({ value, label }) => {
  // store.dispatch(setLanguage(value))
  
  return (
    <>
      <option value={value}>{label}</option>;
    </>
  );
};

export default Option;
