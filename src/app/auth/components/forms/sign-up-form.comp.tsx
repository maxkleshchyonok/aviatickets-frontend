import { styled } from "@mui/material";
import React, { FC } from "react";
import IconTitle from "../icon-title.comp";
import PasswordField from "../password-field.comp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { StyledCenteredBox } from "../styled-centered-box.comp";
import { SignUpYup } from "../../validation-schemas/functions";
import { Control, FieldErrors } from "react-hook-form";
import { StyledButton } from "../styled-button.comp";
import { useNavigate } from "react-router-dom";
import CustomLink from "../custom-link.comp";
import CustomTextField from "../custom-text-field.comp";

interface SignUpFormProps {
  onSubmit: React.FormEventHandler;
  control: Control<SignUpYup, any>;
  validationErrors: FieldErrors<SignUpYup>;
}

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const SignUpForm: FC<SignUpFormProps> = ({
  onSubmit,
  control,
  validationErrors,
}) => {
  const navigate = useNavigate();

  return (
    <StyledCenteredBox mt={8}>
      <IconTitle title="Sign up" Icon={LockOutlinedIcon} />
      <form noValidate onSubmit={onSubmit}>
        <CustomTextField
          type="First Name"
          control={control}
          error={!!validationErrors.firstName}
          helperText={validationErrors.firstName?.message}
        />
        <CustomTextField
          type="Last Name"
          control={control}
          error={!!validationErrors.lastName}
          helperText={validationErrors.lastName?.message}
        />
        <CustomTextField
          type="Email"
          control={control}
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message}
        />
        <PasswordField
          label="Password"
          autoComplete="current-password"
          control={control}
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message}
        />
        <PasswordField
          label="Confirm Password"
          autoComplete="current-password"
          control={control}
          error={!!validationErrors.confirmPassword}
          helperText={validationErrors.confirmPassword?.message}
        />
        <StyledButton type="submit" fullWidth variant="contained">
          Sign Up
        </StyledButton>
        <CustomLink
          text="Already have an account? Sign in"
          onClick={() => navigate("auth/signin/")}
        />
      </form>
    </StyledCenteredBox>
  );
};

export default SignUpForm;
