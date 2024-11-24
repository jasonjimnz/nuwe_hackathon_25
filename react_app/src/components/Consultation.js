import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { ConsultationService } from "../services/consultation_service";
import { authStore } from "../store/authStore";
import { useStore } from "@nanostores/react";

function Consultation() {
  const { isAuthenticated, user } = useStore(authStore);
  const [consultations, setConsultations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newConsultation, setNewConsultation] = useState({
    patientId: "",
    doctorId: "",
    date: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate >= currentDate) {
      setNewConsultation({
        ...newConsultation,
        date: e.target.value,
      });
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (user) {
      setNewConsultation((prevState) => ({
        ...prevState,
        patientId: user.role === "patient" ? user.id : "",
      }));
    }
  }, [user]);

  const fetchConsultations = async () => {
    if (!user) return;
    try {
      const response =
        user.role === "patient"
          ? await ConsultationService.getConsultationsByPatient(user.id)
          : await ConsultationService.getConsultationsByDoctor(user.id);
      setConsultations(response);
    } catch (error) {
      console.error("Error fetching consultations:", error.message);
    }
  };

  const fetchDoctorsAndPatients = async () => {
    try {
      const doctorsResponse = await fetch(
        "http://164.132.56.231:3000/api/user/doctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const patientsResponse = await fetch(
        "http://164.132.56.231:3000/api/user/patients",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (doctorsResponse.ok) {
        setDoctors(await doctorsResponse.json());
      }
      if (patientsResponse.ok) {
        setPatients(await patientsResponse.json());
      }
    } catch (error) {
      console.error("Error fetching doctors or patients:", error.message);
    }
  };

  const handleCreateConsultation = async () => {
    try {
      await ConsultationService.createConsultation(newConsultation);
      fetchConsultations();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error creating consultation:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchConsultations();
      fetchDoctorsAndPatients();
    }
  }, [user]);

  if (!user) {
    return <Typography>Loading...</Typography>; // Handle loading or null user state
  }

  return (
    <Box>
      {/* <Typography variant="h4" gutterBottom>
        {user.role === "patient" ? "My Consultations" : "Consultations"}
      </Typography> */}

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
      >
        Create New Consultation
      </Button>

      <List>
        {consultations.map((consultation) => (
          <React.Fragment key={consultation.id}>
            <ListItem>
              <ListItemText
                primary={`Consultation with Dr. ${consultation.doctor.name}`}
                secondary={`Date: ${new Date(
                  consultation.date
                ).toLocaleString()}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Consultation</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="patient-select-label">Select Patient</InputLabel>
            <Select
              labelId="patient-select-label"
              value={newConsultation.patientId}
              onChange={(e) =>
                setNewConsultation({
                  ...newConsultation,
                  patientId: e.target.value,
                })
              }
            >
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  {patient.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
            <Select
              labelId="doctor-select-label"
              value={newConsultation.doctorId}
              onChange={(e) =>
                setNewConsultation({
                  ...newConsultation,
                  doctorId: e.target.value,
                })
              }
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date"
            fullWidth
            type="datetime-local"
            value={newConsultation.date}
            onChange={handleDateChange}
            margin="dense"
            inputProps={{
              min: new Date().toISOString().slice(0, 16),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateConsultation} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Date cannot be earlier than the current time
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Consultation;
