import React from 'react';
import Header from '../header/Header';
import FooterBar from '../footer_bar/FooterBar';
import Chat from '../chat/Chat';
import mockData from '../../mock_data/mockData.json';
import './HomePagePatient.css';

const HomePagePatient = () => {
  const specialist = mockData.specialists[2];

  const patient = mockData.patients[0];

  return (
    <div className="home-page-patient">
      <Header
        userType="patient"
        name={patient.name}
        additionalInfo={{
          age: patient.age,
          gender: patient.gender,
          conditions: patient.conditions,
        }}
      />
      <div className="chat-container">
        <h3>
          Conversación con: {specialist.name} ({specialist.specialty})
        </h3>
        <Chat userType="patient" specialist={specialist} />
      </div>
      <FooterBar userType="patient" />
    </div>
  );
};

export default HomePagePatient;
