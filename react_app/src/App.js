import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import Navbar from "./components/Navbar";
// import Dashboard from './components/Dashboard';
// import Footer from './components/Footer';
import Login from "./components/login/Login";
import RegisterPage from "./components/RegisterPage";
import HomePagePatient from "./components/home_page_patient/HomePagePatient";
import HomePageSpecialist from "./components/home_page_specialist/HomePageSpecialist";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import NotProtectedRoute from "./components/NotProtectedRoute";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);
  const auth = Boolean(localStorage.getItem("accessToken") != null);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Container sx={{ flex: 1, mt: 4 }}>
            <Routes>
              {/* Rutas protegidas */}
              <Route element={<ProtectedRoute isAuthenticated={auth} />}>
                {/* <Route path="/" element={<Dashboard />} /> */}
                <Route path="/patient" element={<HomePagePatient />} />
                <Route path="/specialist" element={<HomePageSpecialist />} />
              </Route>

              {/* Rutas públicas */}
              <Route element={<NotProtectedRoute isAuthenticated={auth} />}>
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
