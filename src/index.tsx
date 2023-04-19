import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {deepOrange, orange} from "@mui/material/colors";


const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: deepOrange,
		secondary: orange
	},
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<App/>
		</ThemeProvider>
	</Provider>
);

