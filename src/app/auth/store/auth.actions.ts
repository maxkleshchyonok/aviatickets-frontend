import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChangePasswordForm } from "../types/forms/change-password.form";
import { ForgotPasswordForm } from "../types/forms/forgot-password.form";
import { ResetPasswordForm } from "../types/forms/reset-password.form";
import { SignInForm } from "../types/forms/sign-in.form";
import { SignUpForm } from "../types/forms/sign-up.form";
import { VerifyCodeForm } from "../types/forms/verify-code.form";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import axios from "axios";
import repository from "repository";
import { AuthDto } from "../types/auth.dto";
import { ForgotPasswordDto } from "../types/forgot-password.dto";
import { LocalStorageKeys } from "enums/local-storage-keys.enum";
import { VerifyDto } from "../types/verify.dto";

type User = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

export const signIn = createAsyncThunk<
  AuthDto,
  SignInForm,
  { rejectValue: ApiError | undefined }
>("sgnIn", async (data, { rejectWithValue }) => {
  try {
    const response = await repository.post("/auth/signin", data);
    localStorage.setItem("access_token", response.data.accessToken);
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

export const signUp = createAsyncThunk<
  AuthDto,
  SignUpForm,
  { rejectValue: ApiError | undefined }
>("signUp", async (data, { rejectWithValue }) => {
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
});

export const forgotPassword = createAsyncThunk<
  ForgotPasswordDto,
  ForgotPasswordForm,
  { rejectValue: ApiError | undefined }
>("forgotPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await repository.post("/auth/forgot-password", data);
    localStorage.setItem(LocalStorageKeys.ResetToken, response.data);
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

export const resetPassword = createAsyncThunk<
  boolean,
  ResetPasswordForm,
  { rejectValue: ApiError | undefined }
>("resetPassword", async (data, { rejectWithValue }) => {
  try {
    await repository.post("/auth/reset-password", data);
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
});

export const verifyCode = createAsyncThunk<
  VerifyDto,
  VerifyCodeForm,
  { rejectValue: ApiError | undefined }
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

export const changePassword = createAsyncThunk<
  void,
  ChangePasswordForm,
  { rejectValue: ApiError | undefined }
>("changePassword", async (data, { rejectWithValue }) => {
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
});

export const signOut = createAsyncThunk<
  void,
  void,
  { rejectValue: ApiError | undefined }
>("logout", async (_, { rejectWithValue }) => {
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
});
