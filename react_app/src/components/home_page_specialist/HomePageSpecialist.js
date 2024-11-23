import React, { useState } from 'react';
import Header from '../header/Header';
import FooterBar from '../footer_bar/FooterBar';
import Chat from '../chat/Chat';
import mockData from '../../mock_data/mockData.json';
import './HomePageSpecialist.css';

const HomePageSpecialist = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = mockData.patients;

  const specialist = mockData.specialists[2];

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };
  const handleBackToList = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="home-page-specialist">
      <Header
        userType="specialist"
        name={specialist.name}
        specialty={specialist.specialty}
      />
      {selectedPatient ? (
        <div className="patient-chat">
          <h3>Conversación con: {selectedPatient.name}</h3>
          <Chat userType="specialist" patient={selectedPatient} />
        </div>
      ) : (
        <div className="patients-list">
          <h3>Mis pacientes</h3>
          <ul>
            {patients.map((patient, index) => (
              <li key={index} onClick={() => handleSelectPatient(patient)}>
                {patient.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <FooterBar
        userType="specialist"
        patientName={selectedPatient ? selectedPatient.name : null}
        onBackClick={handleBackToList}
      />
    </div>
  );
};

export default HomePageSpecialist;
