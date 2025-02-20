import React from 'react';
import Option from './Option';

interface SelectPropsType {
  name: string;
  options: { value: string, label: string }[];
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  labelText?: string;
  htmlFor?: string;
  error?: string; 
  inputRef?: React.Ref<HTMLSelectElement>;
  registerProps?:any; 
}

const Select: React.FC<SelectPropsType> = ({ name, options, handleOnChange, value, labelText, registerProps, htmlFor, error, inputRef }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{labelText}</label>
      <select name={name} value={value} onChange={handleOnChange} ref={inputRef} {...registerProps}> {/* Add name and ref */}
        {options.map((option) => (
          <Option key={option.value} value={option.value} label={option.label} />
        ))}
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Select;
