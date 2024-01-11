import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    CreateUserDto,
    ForgotPasswordDto,
    RegisterUserDto,
    ResetPasswordDto,
    VerifyCodeDto
} from "app/auth/types/types";
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

export const registerUser = createAsyncThunk<User, RegisterUserDto>('registerUser', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/auth/signup', data);
        return response.data;
    } catch (error) {
        return rejectWithValue('SignUp failed');
    }
})

export const forgotPassword = createAsyncThunk<User, ForgotPasswordDto>('forgotPassword', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/auth/forgot-password', data);
        sessionStorage.setItem('reset_token', response.data.resetToken);
        return response.data;
    } catch (error) {
        return rejectWithValue('Operation with forgotten password failed');
    }
})

export const resetPassword = createAsyncThunk<User, ResetPasswordDto>('resetPassword', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/auth/reset-password', data);
        return response.data;
    } catch (error) {
        return rejectWithValue('Operation with password reset was failed');
    }
});

export const verifyResetCode = createAsyncThunk<boolean, VerifyCodeDto>('verifyCode', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/auth/verify', data);
        return response.data;
    } catch (error) {
        return rejectWithValue('Verification failed');
    }
});