import { createRoot } from "react-dom/client";
import App from "App";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import "i18n";
import { Suspense } from "react";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
const socketClient = new SocketClient();

root.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </Provider>
);

export { socketClient };
