import React from 'react';
import './Header.css';

const Header = ({ userType, name, specialty, additionalInfo }) => {
  return (
    <header className="header-container">
      {userType === 'specialist' ? (
        <>
          <h2>Dr/a. {name}</h2>
          <p>{specialty}</p>
        </>
      ) : (
        <>
          <h2>{name}</h2>
          <p>
            {additionalInfo.gender}, {additionalInfo.age} años
          </p>
          <p>Condiciones: {additionalInfo.conditions}</p>
        </>
      )}
    </header>
  );
};

export default Header;
