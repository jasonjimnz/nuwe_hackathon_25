import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { authStore } from './store/authStore';
import { useStore } from '@nanostores/react';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
// import Footer from './components/Footer';
import RegisterPage from './components/RegisterPage';
import HomePagePatient from './components/home_page_patient/HomePagePatient';
import HomePageSpecialist from './components/home_page_specialist/HomePageSpecialist';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import NotProtectedRoute from './components/NotProtectedRoute';
import Consultation from './components/Consultation';
import ConsultationDetail from './components/ConsultationDetail';
import Profile from './components/Profile';

function App() {
  const auth = useStore(authStore);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Container sx={{ flex: 1, mt: 4 }}>
            <Routes>
              {/* Rutas protegidas */}
              <Route
                element={
                  <ProtectedRoute isAuthenticated={auth.isAuthenticated} />
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/consultation" element={<Consultation />} />
                <Route
                  path="/consultation/:id"
                  element={<ConsultationDetail />}
                />
                <Route path="/patient" element={<HomePagePatient />} />
                <Route path="/specialist" element={<HomePageSpecialist />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Rutas públicas */}
              <Route
                element={
                  <NotProtectedRoute isAuthenticated={auth.isAuthenticated} />
                }
              >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="*" element={<LoginPage />} />
              </Route>
            </Routes>
          </Container>
          {/* <Footer isDarkMode={isDarkMode} /> */}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
