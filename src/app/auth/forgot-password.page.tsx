import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "hooks/redux.hooks";
import { forgotPassword } from "app/auth/store/auth.actions";
import { ForgotPasswordDto } from "app/auth/types/types";
import { useNavigate } from "react-router-dom";
import { forgotValidationSchema } from "app/auth/validation-schemas/functions";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ForgotPasswordForm from "./components/forms/forgot-password-form.comp";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";

const defaultTheme = createTheme();

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(forgotValidationSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: { email: string }) => {
    let device = localStorage.getItem("device_id");

    if (!device) {
      device = uuidv4();
      localStorage.setItem("device_id", device);
    }

    const forgotData: ForgotPasswordDto = {
      deviceId: device,
      email: values.email,
    };

    const response = await dispatch(forgotPassword(forgotData));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      setTimeout(() => {
        navigate("/verify");
      }, 1500);
      enqueueSnackbar("Verification email sent", {
        variant: "success",
        autoHideDuration: 1500,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ForgotPasswordForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          validationErrors={errors}
        />
      </Container>
    </ThemeProvider>
  );
}
