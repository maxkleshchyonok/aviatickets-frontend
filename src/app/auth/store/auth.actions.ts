import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserDto, ForgotPasswordDto, RegisterUserDto } from "app/auth/types/types";
import repository from "repository";

type User = {
    id: string,
    name: string,
    email: string,
    accessToken: string,
    refreshToken: string,
};

export const loginUser = createAsyncThunk<User, CreateUserDto>('loginUser', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/auth/signin', data);
        sessionStorage.setItem('access_token', response.data.accessToken);
        sessionStorage.setItem('userId', response.data.id);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        return response.data;
    } catch (error) {
        return rejectWithValue('SignIn failed')
    }
});

export const registerUser = createAsyncThunk<User, RegisterUserDto>('registerUser', async (data, {rejectWithValue}) => {
    try {
        const response = await repository.post('/auth/signup', data);
        return response.data;
    } catch(error) {
        return rejectWithValue('SignUp failed');
    }
})

export const forgotPassword = createAsyncThunk<User, ForgotPasswordDto>('forgotPassword', async (data, {rejectWithValue}) => {
    try {
        const response = await repository.post('/auth/forgot', data);
        return response.data;
    } catch (error) {
        return rejectWithValue('Operation with forgotten password failed');
    }
})