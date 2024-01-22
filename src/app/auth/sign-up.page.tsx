import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "hooks/redux.hooks";
import { useNavigate } from "react-router-dom";
import { RegisterUserDto } from "app/auth/types/types";
import { registerUser } from "app/auth/store/auth.actions";
import { signUpValidationSchema } from "app/auth/validation-schemas/functions";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpForm from "./components/forms/sign-up-form.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { enqueueSnackbar } from "notistack";

const defaultTheme = createTheme();

export function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserDto>({
    resolver: yupResolver(signUpValidationSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterUserDto> = async (values) => {
    let device = localStorage.getItem("device_id");

    if (!device) {
      device = uuidv4();
      localStorage.setItem("device_id", device);
    }

    const registerData: RegisterUserDto = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    const response = await dispatch(registerUser(registerData));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      setTimeout(() => {
        navigate("/flight-search");
      }, 1500);
      enqueueSnackbar("Succesfully signed up", {
        variant: "success",
        autoHideDuration: 1500,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <SignUpForm
          control={control}
          onSubmit={handleSubmit(onSubmit)}
          validationErrors={errors}
        />
      </Container>
    </ThemeProvider>
  );
}
