import React from "react";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "hooks/redux.hooks";
import { useNavigate } from "react-router-dom";
import { ResetPasswordDto } from "app/auth/types/types";
import { resetPassword } from "app/auth/store/auth.actions";
import { resetValidationSchema } from "app/auth/validation-schemas/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import ResetPasswordForm from "./components/forms/reset-password-form.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { enqueueSnackbar } from "notistack";

const defaultTheme = createTheme();

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    resolver: yupResolver(resetValidationSchema),
    mode: "onBlur",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordDto) => {
    const resetData: ResetPasswordDto = {
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    const response = await dispatch(resetPassword(resetData));

    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
      enqueueSnackbar("Password succesfully changed", {
        variant: "success",
        autoHideDuration: 1500,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ResetPasswordForm
          control={control}
          onSubmit={handleSubmit(onSubmit)}
          validationErrors={errors}
        />
      </Container>
    </ThemeProvider>
  );
}
