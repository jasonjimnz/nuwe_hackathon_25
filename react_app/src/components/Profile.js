import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { getUserDetail, updateUser } from '../services/user_service';
import { authStore } from '../store/authStore';
import { useStore } from '@nanostores/react';

function Profile() {
  const { isAuthenticated, user } = useStore(authStore);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetail();
      } catch (error) {
        setError('Failed to fetch user details. Please try again.');
      }
    };
    fetchUserDetails();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.id, {
        Email: user.email,
        Name: user.name,
        LastName: user.lastName,
        BirthDate: user.birthDate,
        Gender: user.gender,
        Role: user.role,
      });
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        mb: 8,
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Mi perfil
      </Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          label="Nombre"
          value={user.name}
          onChange={(e) => (user.name = e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido"
          value={user.lastName}
          onChange={(e) => (user.lastName = e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={user.email}
          onChange={(e) => (user.email = e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fecha de nacimiento"
          type="date"
          value={user.birthDate}
          onChange={(e) => (user.birthDate = e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="gender-label">Género</InputLabel>
          <Select
            labelId="gender-label"
            value={user.gender}
            onChange={(e) => (user.gender = e.target.value)}
            label="Género"
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Femenino">Femenino</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
          </Select>
        </FormControl>
        {/* No podrán cambiar de role no? */}
        {/* <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Rol</InputLabel>
          <Select
            labelId="role-label"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            label="Rol"
          >
            <MenuItem value="Paciente">Paciente</MenuItem>
            <MenuItem value="Medico">Médico</MenuItem>
            <MenuItem value="Administrador">Administrador</MenuItem>
          </Select>
        </FormControl> */}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Actualizar mi perfil
        </Button>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/')}
        >
          Atrás
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
