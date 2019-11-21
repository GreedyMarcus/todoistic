import React from 'react';
import './Dropdown.css';

interface Props {
  label: string;
  options: string[];
  defaultOption: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: React.FC<Props> = ({ label, options, defaultOption, handleChange }) => {
  return (
    <div>
      <label className="Dropdown-label" htmlFor="dropdown">{ label }</label>
      <select className="Dropdown"
              id="dropdown"
              defaultValue={defaultOption}
              onChange={handleChange}>
        {
          options.map((option, index) => (
            <option key={index} value={option}>{ option }</option>
          ))
        }
      </select>
    </div>
  );
}