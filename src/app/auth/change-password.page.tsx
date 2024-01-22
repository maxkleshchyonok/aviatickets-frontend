import React from "react";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "hooks/redux.hooks";
import { useNavigate } from "react-router-dom";
import { ChangePasswordDto } from "app/auth/types/types";
import { changePassword } from "app/auth/store/auth.actions";
import { changePasswordValidationSchema } from "app/auth/validation-schemas/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import ChangePasswordForm from "./components/forms/change-password-form.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { enqueueSnackbar } from "notistack";

const defaultTheme = createTheme();

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePasswordDto>({
    resolver: yupResolver(changePasswordValidationSchema),
    mode: "onBlur",
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  const onSubmit = async (data: ChangePasswordDto) => {
    const changeData: ChangePasswordDto = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };

    const response = await dispatch(changePassword(changeData));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      enqueueSnackbar("Succesfully changed password", { variant: "success" });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ChangePasswordForm
          control={control}
          validationErrors={errors}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Container>
    </ThemeProvider>
  );
}
