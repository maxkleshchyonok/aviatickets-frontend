import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './app.routes';
import ErrorBoundaryComp from './components/error-boundary.comp';
import store from "./store";

function App() {
  return (
    <ErrorBoundaryComp>
      <SnackbarProvider maxSnack={5} autoHideDuration={5000} style={{ fontSize: '16px' }}>
        <Provider store={store}>
          <Router>
            <AppRoutes />
          </Router>
        </Provider>
      </SnackbarProvider>
    </ErrorBoundaryComp >
  );
}

export default App;
