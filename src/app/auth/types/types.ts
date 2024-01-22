import { BaseState } from "types/base-state.type";

export type User = {
  id: string;
  name: string;
};

export interface AuthState extends BaseState {
  isAuth: boolean;
  isPending: {
    isAuth: boolean;
    isBookings: boolean;
  };
  errors: {
    isAuth: string | null;
    isBookings: string | null;
  };
}

export type CreateUserDto = {
  email: string;
  password: string;
};

export type RegisterUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordDto = {
  deviceId: string;
  email: string;
};

export type ResetPasswordDto = {
  password: string;
  confirmPassword: string;
};

export type ChangePasswordDto = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type VerifyCodeDto = {
  code: number;
};

export type ForgotPasswordResponse = {
  resetToken: string;
};
