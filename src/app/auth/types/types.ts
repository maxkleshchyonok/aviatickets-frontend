export type User = {
    id: string;
    name: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export type CreateUserDto = {
    email: string,
    password: string,
    deviceId: string,
};

export type RegisterUserDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    deviceId: string;
}

export type ForgotPasswordDto = {
    deviceId: string;
    email: string;
}

export type ResetPasswordDto = {
    password: string;
}

export type VerifyCodeDto = {
    code: number;
}

export type ForgotPasswordResponse = {
    resetToken: string;
}