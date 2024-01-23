import io from "socket.io-client";
import { AppDispatch } from "store";
import { Message } from "aviatickets-submodule/libs/socket/types/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SocketClient } from "aviatickets-submodule/libs/socket/socket.client";
import { socketClient } from "index";

export const connectToSocket = createAsyncThunk(
  "connectToSocket",
  async function (token: string) {
    return await socketClient.connect(token);
  }
);

export const disconnectFromSocket = createAsyncThunk(
  "disconnectFromSocket",
  async function () {
    return await socketClient.disconnect();
  }
);

export const sendMessage = createAsyncThunk(
  "sendMessage",
  async function (message: Message) {
    return await socketClient.emit("sendMessageToRoom", message);
  }
);

export const getChatHistory = createAsyncThunk("getHistory", async function () {
  return await socketClient.emit("getHistory", {});
});

export const recieveMessage = createAsyncThunk(
  "recieveMessage",
  async function (_, { getState, dispatch }) {
    return await socketClient.on("newMessage", (receivedMessage: Message) => {
      console.log(receivedMessage + "AAAA");
      dispatch({
        type: "chat/saveRecievedMessage",
        payload: { message: receivedMessage },
      });
    });
  }
);
