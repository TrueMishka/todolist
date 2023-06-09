import { createSlice } from '@reduxjs/toolkit';
import { appActions } from 'app/app.reducer';
import { clearTasksAndTodolists } from 'common/actions/common.actions';
import { createAppAsyncThunk } from 'common/utils';
import { authAPI, LoginParamsType } from 'features/auth/auth.api';
import { ResultCode } from 'common/enums';

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  'auth/login',
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const res = await authAPI.login(arg);
      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true };
      } else {
        const isShowAppError = !res.data.fieldsErrors.length;
        return rejectWithValue({
          data: res.data,
          showGlobalError: isShowAppError,
        });
      }
    } finally {
      dispatch(initializeApp());
    }
  }
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true });
    }
  }
);

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean; userLogin: string }, void>(
  'app/initializeApp',
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const res = await authAPI.me();
      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true, userLogin: res.data.data.login };
      } else {
        return rejectWithValue({ data: res.data, showGlobalError: false });
      }
    } finally {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userLogin: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userLogin = '';
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userLogin = action.payload.userLogin;
      });
  },
});

export const authReducer = slice.reducer;
export const authThunk = { login, logout, initializeApp };
