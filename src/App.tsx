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
