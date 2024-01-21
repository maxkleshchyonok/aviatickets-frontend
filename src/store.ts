import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "./app/chat/store/chat.slice";

const store = configureStore({
    reducer: {
        chat: chatSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store