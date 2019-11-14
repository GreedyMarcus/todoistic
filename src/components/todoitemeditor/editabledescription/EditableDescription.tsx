import React from 'react';
import './EditableDescription.css';

interface Props {
  description: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const EditableDescription: React.FC<Props> = ({ description, handleChange }) => {
  return (
    <div className="EditableDescription">
      <label className="EditableDescription-label" htmlFor="description">Description</label>
      <textarea className="EditableDescription-content"
                id="description"
                name="description"
                placeholder="Add description for this todo..."
                value={description}
                onChange={handleChange} />
    </div>
  );
}