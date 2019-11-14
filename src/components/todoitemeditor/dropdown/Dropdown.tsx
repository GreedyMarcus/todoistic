import React from 'react';
import './Dropdown.css';

interface Props {
  label: string;
  options: string[];
  defaultOption: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) =>void;
  disabled?: boolean;
}

export const Dropdown: React.FC<Props> = ({ label, options, defaultOption, handleChange, disabled }) => {
  return (
    <div>
      <label className="Dropdown-label" htmlFor="dropdown">{ label }</label>
      <select className="Dropdown"
              id="dropdown"
              disabled={disabled}
              defaultValue={defaultOption}
              onChange={handleChange}>
        {
          options.map(option => (
            <option key={option} value={option}>{ option }</option>
          ))
        }
      </select>
    </div>
  );
}