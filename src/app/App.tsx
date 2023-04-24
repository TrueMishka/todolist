import React, { useEffect } from 'react';
import './App.css';
import { TodolistsList } from 'features/todolists-lists/TodolistsList';
import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from 'features/auth/Login/Login';
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { selectAppStatus, selectIsInitialized } from 'app/app.selectors';
import { authThunk } from '../features/auth/auth.reducer';
import { useActions } from '../common/hooks/useActions';
import { ProgressBar } from '../common/components';

const App = () => {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunk);

  useEffect(() => {
    initializeApp({});
  }, []);

  const logoutHandler = () => logout({});

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <ErrorSnackbar />
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <Menu />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              To Do
            </Typography>
            {isLoggedIn && (
              <div>
                <IconButton color='inherit' aria-label='logout' onClick={logoutHandler}>
                  <LogoutIcon />
                </IconButton>
              </div>
            )}
          </Toolbar>
          {status === 'loading' && <ProgressBar />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={'/'} element={<TodolistsList />} />
            <Route path={'/login'} element={<Login />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
};

export default App;
