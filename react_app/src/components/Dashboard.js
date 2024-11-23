import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

function Dashboard({ userDetail }) {
  const openConsultations = [];
  const closedConsultations = [];

  return (
    <>
      <Box
        sx={{
          mb: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Consultas Abiertas
          </Typography>
          <List>
            {openConsultations.length > 0 ? (
              openConsultations.map((consulta) => (
                <React.Fragment key={consulta.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Consulta con Dr. ${consulta.doctor.name}`}
                      secondary={`Fecha: ${new Date(
                        consulta.date
                      ).toLocaleString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2">
                No hay consultas abiertas.
              </Typography>
            )}
          </List>
        </Box>

        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Consultas Cerradas
          </Typography>
          <List>
            {closedConsultations.length > 0 ? (
              closedConsultations.map((consulta) => (
                <React.Fragment key={consulta.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Consulta con Dr. ${consulta.doctor.name}`}
                      secondary={`Fecha: ${new Date(
                        consulta.date
                      ).toLocaleString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2">
                No hay consultas cerradas.
              </Typography>
            )}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          mb: 3,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Consultas Abiertas
          </Typography>
          <List>
            {openConsultations.length > 0 ? (
              openConsultations.map((consulta) => (
                <React.Fragment key={consulta.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Consulta con Dr. ${consulta.doctor.name}`}
                      secondary={`Fecha: ${new Date(
                        consulta.date
                      ).toLocaleString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2">
                No hay consultas abiertas.
              </Typography>
            )}
          </List>
        </Box>

        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Conversacion con medico
          </Typography>
          <List>
            {closedConsultations.length > 0 ? (
              closedConsultations.map((consulta) => (
                <React.Fragment key={consulta.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Consulta con Dr. ${consulta.doctor.name}`}
                      secondary={`Fecha: ${new Date(
                        consulta.date
                      ).toLocaleString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2">
                No hay consultas cerradas.
              </Typography>
            )}
          </List>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
