import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Button,
  Typography,
  Tooltip,
  Avatar,
} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { authStore } from '../store/authStore';
import { logoutStore } from '../store/authStore';
import { useStore } from '@nanostores/react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, user } = useStore(authStore);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'flex' },
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="Nuwe"
              src={
                isDarkMode
                  ? '/assets/caixabank-icon-blue.png'
                  : '/assets/caixabank-icon.png'
              }
              sx={{ mr: 1 }}
            />
            Nuwe
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            {isAuthenticated && user && (
              <>
                <Tooltip title={user.email}>
                  {/* TODO Molaría coger la inicial-iniciales del nombre en lugar de la primera letra del email */}
                  <Avatar sx={{ ml: 2 }} onClick={() => navigate('/profile')}>
                    {user.email.charAt(0).toUpperCase()}
                  </Avatar>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {isAuthenticated && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            fullWidth
            sx={{
              width: { xs: '100%', md: 250 },
              position: 'relative',
              height: '100vh',
            }}
          >
            <Typography
              sx={{ p: 2, background: '#007eae', color: 'white' }}
              variant="h6"
              gutterBottom
            >
              Menu
            </Typography>
            <Button
              variant={isActive('/') ? 'contained' : 'text'}
              color="primary"
              component={Link}
              to="/"
              startIcon={<DashboardIcon />}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                pl: 2,
                borderRadius: 0,
              }}
            >
              Dashboard
            </Button>

            <Button
              variant={isActive('/consultation') ? 'contained' : 'text'}
              color="primary"
              component={Link}
              to="/consultation"
              startIcon={<MedicalInformationIcon />}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                pl: 2,
                borderRadius: 0,
              }}
            >
              Consultation
            </Button>

            <ButtonGroup
              fullWidth
              orientation="vertical"
              sx={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                borderRadius: 0,
              }}
            >
              <Button
                fullWidth
                variant="contained"
                color="default"
                startIcon={
                  isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />
                }
                onClick={toggleTheme}
                sx={{
                  pl: 2,
                  borderRadius: 0,
                }}
              >
                {isDarkMode ? 'Light' : 'Dark'}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={logoutStore}
                startIcon={<LogoutIcon />}
                sx={{
                  borderRadius: 0,
                }}
              >
                Logout
              </Button>
            </ButtonGroup>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
