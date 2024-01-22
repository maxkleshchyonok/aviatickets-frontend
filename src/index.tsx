import React from "react";
import { createRoot } from "react-dom/client";
import App from "App";
import "./index.css";
import { SocketClient } from "aviatickets-submodule/libs/socket/socket.client";
import { Provider } from "react-redux";
import store from "store";

export const socketClient = new SocketClient();

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
