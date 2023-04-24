import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ProgressBar } from 'common/components';
import { useSelector } from 'react-redux';
import { selectAppStatus } from 'app/app.selectors';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { useActions } from 'common/hooks';
import { authThunk } from 'features/auth/auth.reducer';

export const Header = () => {
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { logout } = useActions(authThunk);
  const logoutHandler = () => logout({});

  return (
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
  );
};
