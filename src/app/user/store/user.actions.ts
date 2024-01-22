import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingsDto } from "app/bookings/types/types";
import repository from "repository";

export const getAllBookings = createAsyncThunk<BookingsDto, void>('getAllBookings', async (_, { rejectWithValue }) => {
    try {
        const response = await repository.get('/users/me/bookings');
        return response.data;
    } catch (error) {
        return rejectWithValue('Loading bookings failed');
    }
});