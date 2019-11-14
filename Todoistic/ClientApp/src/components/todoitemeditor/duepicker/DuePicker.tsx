import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './DuePicker.css';

interface Props {
  due: Date;
  handleChange: (date: Date) => void;
}

export const DuePicker: React.FC<Props> = ({ due, handleChange }) => {
  return (
    <div>
      <label className="DuePicker-label" htmlFor="due">Due</label>
      <DatePicker className="DuePicker-datepicker"
                  id="due"
                  isClearable
                  dateFormat="yyyy. MM. dd"
                  selected={new Date(due)}
                  onChange={handleChange} />
    </div>
  );
}