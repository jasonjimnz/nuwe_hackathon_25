import React from 'react';
import './FooterBar.css';

const FooterBar = ({ userType, patientName, onBackClick }) => {
  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    window.location.reload();
  };

  return (
    <footer className="footer-bar">
      {userType === 'specialist' && patientName ? (
        <>
          <button onClick={onBackClick} className="footer-button back-button">
            Volver a la lista de pacientes
          </button>
          <button className="footer-button">Mi perfil</button>
          <button className="footer-button">Perfil de {patientName}</button>
        </>
      ) : (
        <>
          <button className="footer-button">Mi perfil</button>
        </>
      )}
      <button onClick={handleLogout} className="footer-button">
        Cerrar sesión
      </button>
    </footer>
  );
};

export default FooterBar;
