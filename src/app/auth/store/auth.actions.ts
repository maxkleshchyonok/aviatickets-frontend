import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ChangePasswordDto,
    CreateUserDto,
    ForgotPasswordDto,
    ForgotPasswordResponse,
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

export const forgotPassword = createAsyncThunk<ForgotPasswordResponse, ForgotPasswordDto>('forgotPassword', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/auth/forgot-password', data);
        localStorage.setItem('reset_token', response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue('Operation with forgotten password failed');
    }
})

export const resetPassword = createAsyncThunk<boolean, ResetPasswordDto>('resetPassword', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/auth/reset-password', data);
        if (response.status !== 200) {
            alert('Operation failed');
            return false;
        }
        return true;
    } catch (error) {
        return rejectWithValue('Operation with password reset was failed');
    }
});

export const verifyResetCode = createAsyncThunk<string | boolean, VerifyCodeDto>('verifyCode', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/auth/verify', data);
        if (response.data) {
            localStorage.setItem('reset_token', response.data);
            return response.data;
        } 
        if (!response.data) {
            return false;
        }
    } catch (error) {
        return rejectWithValue('Verification failed');
    }
});

export const changePassword = createAsyncThunk<void, ChangePasswordDto>('changePassword', async (data, {rejectWithValue}) => {
    try {
        await repository.post('/auth/change-password', data);
    } catch (error) {
        return rejectWithValue('Change password failed')
    }
});

export const logout = createAsyncThunk('logout', async(_, {rejectWithValue}) => {
    try {
        await repository.post('/auth/signout');
    } catch (error) {
        return rejectWithValue('Logout failed')
    }
});
