import React from 'react';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import LogoutIcon from '@mui/icons-material/Logout';
import { ProgressBar } from 'common/components';
import { useSelector } from 'react-redux';
import { selectAppStatus } from 'app/app.selectors';
import { selectIsLoggedIn, selectUserLogin } from 'features/auth/auth.selectors';
import { useActions } from 'common/hooks';
import { authThunk } from 'features/auth/auth.reducer';

export const Header = () => {
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userLogin = useSelector(selectUserLogin);

  const { logout } = useActions(authThunk);
  const logoutHandler = () => logout({});

  return (
    <AppBar position='static'>
      <Toolbar>
        <PlaylistAddCheckIcon fontSize={'large'} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          To-Do List
        </Typography>
        {isLoggedIn && (
          <Grid sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography variant='h6' component='div' sx={{ fontSize: '18px', flexGrow: 1 }}>
              {userLogin}
            </Typography>
            <IconButton color='inherit' aria-label='logout' onClick={logoutHandler}>
              <LogoutIcon />
            </IconButton>
          </Grid>
        )}
      </Toolbar>
      {status === 'loading' && <ProgressBar />}
    </AppBar>
  );
};
