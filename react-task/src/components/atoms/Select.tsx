// Select.tsx
import React from 'react';
import Option from './Option';

interface SelectPropsType {
  options: { value: string, label: string }[];
  handleOnChange: (value: string) => void;
  value: string;
}

const Select: React.FC<SelectPropsType> = ({ options, handleOnChange, value }) => {
  return (
    <select value={value} onChange={(e) => handleOnChange(e.target.value)}>
      {options.map((option) => (
        <Option key={option.value} value={option.value} label={option.label} />
      ))}
    </select>
  );
}

export default Select;
