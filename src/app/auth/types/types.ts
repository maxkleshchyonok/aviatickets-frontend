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
};

export type RegisterUserDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type ForgotPasswordDto = {
    email: string;
}

export type ResetPasswordDto = {
    email: string | null;
    password: string;
}

export type VerifyCodeDto = {
    code: number;
    email: string | null;
}