import { AppRootStateType } from 'app/store';

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectUserLogin = (state: AppRootStateType) => state.auth.userLogin;
