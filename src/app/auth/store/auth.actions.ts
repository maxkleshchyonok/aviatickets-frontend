import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChangePasswordDto,
  CreateUserDto,
  ForgotPasswordDto,
  ForgotPasswordResponse,
  RegisterUserDto,
  ResetPasswordDto,
  VerifyCodeDto,
} from "app/auth/types/types";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import axios from "axios";
import repository from "repository";

type User = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

export const loginUser = createAsyncThunk<
  User,
  CreateUserDto,
  { rejectValue: ApiError | undefined }
>("loginUser", async (data, { rejectWithValue }) => {
  try {
    const response = await repository.post("/auth/signin", data);
    sessionStorage.setItem("access_token", response.data.accessToken);
    sessionStorage.setItem("userId", response.data.id);
    localStorage.setItem("refresh_token", response.data.refreshToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Unknown erorr",
      statusCode: 500,
    } as ApiError);
  }
});

export const registerUser = createAsyncThunk<User, RegisterUserDto>(
  "registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await repository.post("/auth/signup", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({
        message: "Unknown erorr",
        statusCode: 500,
      } as ApiError);
    }
  }
);

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordDto
>("forgotPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await repository.post("/auth/forgot-password", data);
    localStorage.setItem("reset_token", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Unknown erorr",
      statusCode: 500,
    } as ApiError);
  }
});

export const resetPassword = createAsyncThunk<boolean, ResetPasswordDto>(
  "resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await repository.post("/auth/reset-password", data);
      if (response.status !== 200) {
        alert("Operation failed");
        return false;
      }
      return true;
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({
        message: "Unknown erorr",
        statusCode: 500,
      } as ApiError);
    }
  }
);

export const verifyResetCode = createAsyncThunk<
  string | boolean,
  VerifyCodeDto
>("verifyCode", async (data, { rejectWithValue }) => {
  try {
    const response = await repository.post("/auth/verify", data);
    if (response.data) {
      localStorage.setItem("reset_token", response.data);
      return response.data;
    }
    if (!response.data) {
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Unknown erorr",
      statusCode: 500,
    } as ApiError);
  }
});

export const changePassword = createAsyncThunk<void, ChangePasswordDto>(
  "changePassword",
  async (data, { rejectWithValue }) => {
    try {
      await repository.post("/auth/change-password", data);
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({
        message: "Unknown erorr",
        statusCode: 500,
      } as ApiError);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      await repository.post("/auth/signout");
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({
        message: "Unknown erorr",
        statusCode: 500,
      } as ApiError);
    }
  }
);
