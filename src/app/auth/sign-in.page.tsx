import React from "react";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "hooks/redux.hooks";
import { loginUser } from "app/auth/store/auth.actions";
import { CreateUserDto } from "app/auth/types/types";
import { useNavigate } from "react-router-dom";
import { signInValidationSchema } from "app/auth/validation-schemas/functions";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import MainImage from "./components/main-image.comp";
import SignInForm from "./components/forms/sign-in-form.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { enqueueSnackbar } from "notistack";

const defaultTheme = createTheme();

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: yupResolver(signInValidationSchema),
    mode: "all",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: CreateUserDto) => {
    let device = localStorage.getItem("device_id");

    if (!device) {
      device = uuidv4();
      localStorage.setItem("device_id", device);
    }

    const loginData: CreateUserDto = {
      email: data.email,
      password: data.password,
    };

    const response = await dispatch(loginUser(loginData));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      setTimeout(() => {
        navigate("/flight-search");
      }, 1500);
      enqueueSnackbar("Succesfully signed in", {
        variant: "success",
        autoHideDuration: 1500,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <MainImage />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <SignInForm
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            validationErrors={errors}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
