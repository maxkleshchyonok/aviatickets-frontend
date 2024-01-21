import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "./app/chat/store/chat.slice";
import { authSlice } from 'app/auth/store/auth.slice';

const store = configureStore({
    reducer: {
        chat: chatSlice.reducer,
        auth: authSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store