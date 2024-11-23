import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/login/Login';
import HomePagePatient from './components/home_page_patient/HomePagePatient';
import HomePageSpecialist from './components/home_page_specialist/HomePageSpecialist';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const renderPage = () => {
    if (!user) {
      return <Login />;
    }

    if (user.type === 'Paciente') {
      return <HomePagePatient />;
    }

    if (user.type === 'Medico') {
      return <HomePageSpecialist />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
