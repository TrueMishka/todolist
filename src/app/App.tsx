import React, { useEffect } from 'react';
import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Container } from '@mui/material';
import { selectIsInitialized } from 'app/app.selectors';
import { authThunk } from 'features/auth/auth.reducer';
import { useActions } from 'common/hooks/useActions';
import { Header } from 'app/Header/Header';
import { Routing } from 'app/Routing/Routing';

const App = () => {
  const isInitialized = useSelector(selectIsInitialized);

  const { initializeApp } = useActions(authThunk);

  useEffect(() => {
    initializeApp({});
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ErrorSnackbar />
      <Header />
      <Container fixed>
        <Routing />
      </Container>
    </Box>
  );
};

export default App;
