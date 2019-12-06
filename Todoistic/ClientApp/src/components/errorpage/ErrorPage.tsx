import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

interface Props {
  errorMessage: string;
}

export const ErrorPage: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div className="ErrorPage">
      <h1 className="ErrorPage-Title">Oops!</h1>
      <h2 className="ErrorPage-Message">{errorMessage}</h2>
      <Link to="/">
        <button className="ErrorPage-Button">Back to home</button>
      </Link>
    </div>
  );
}