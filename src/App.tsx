import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatCollapse from './app/chat/chat.collapse';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { connectToSocket, disconnectFromSocket } from 'app/chat/store/chat.actions';
import { chatSelector } from 'app/chat/store/chat.selectors';
import { setUser } from 'app/chat/store/chat.slice';
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './app.routes';
import ErrorBoundaryComp from './components/error-boundary.comp';
import store from "./store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "app/utils/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const dispatch = useAppDispatch()
  const chat = useAppSelector(chatSelector)
  const tokens = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmbXdxbWZkaXNvY21hc2xuZiIsInJvbGUiOiJjbGllbnQiLCJuYW1lIjoiUGF0cmljayBBZGFtcyIsImlhdCI6MTUxNjIzOTAyMn0.-9JTEEt4qMd9ZOrg39ZAIob_bn4hO44hvk6KY15VoDU',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmbXdxbWZkaXNvY21hc2xuZiIsInJvbGUiOiJjbGllbnQiLCJuYW1lIjoiSm9obiBKb25lcyIsImlhdCI6MTUxNjIzOTAyMn0.ecoAcUgMd-eVedX8uG0CQh58OM4vVWjySzKFAL9Q5iQ',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmbXdxbWZkaXNvY21hc2xuZiIsInJvbGUiOiJjbGllbnQiLCJuYW1lIjoiTWljayBHb3Jkb24iLCJpYXQiOjE1MTYyMzkwMjJ9.L6I0mLJZdiMnI2vH7qAWDCnGK02je7LCPxTFq68Zke0'
  ]
  useEffect(() => {
    dispatch(connectToSocket(tokens[Math.floor(Math.random()*tokens.length)]))
    return () => {
      if (chat.connected === true) {
        dispatch(disconnectFromSocket());
      }
    };
  }, [dispatch])

  return (
    <ErrorBoundaryComp>
      <SnackbarProvider maxSnack={5} autoHideDuration={5000} style={{ fontSize: '16px' }}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Router>
                <CssBaseline />
                <AppRoutes />
              </Router>
            </LocalizationProvider>
          </ThemeProvider>
        </Provider>
      </SnackbarProvider>
    </ErrorBoundaryComp >
  );
}

export default App;
