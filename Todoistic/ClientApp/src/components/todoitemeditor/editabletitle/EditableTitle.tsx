import React from 'react';
import './EditableTitle.css';

interface Props {
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditableTitle: React.FC<Props> = ({ title, handleChange }) => {
  return (
    <input className={`EditableTitle ${title === '' && 'EditableTitle-empty'}`}
           type="text"
           name="title"
           placeholder="Missing title..."
           value={title}
           onChange={handleChange} />
  );
}