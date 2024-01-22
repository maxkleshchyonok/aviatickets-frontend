import { styled } from "@mui/material";
import React, { FC } from "react";
import IconTitle from "../icon-title.comp";
import PasswordField from "../password-field.comp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { StyledCenteredBox } from "../styled-centered-box.comp";
import { SignInYup } from "../../validation-schemas/functions";
import { Control, FieldErrors } from "react-hook-form";
import { StyledButton } from "../styled-button.comp";
import { useNavigate } from "react-router-dom";
import CustomLink from "../custom-link.comp";
import CustomTextField from "../custom-text-field.comp";

interface SignInFormProps {
  onSubmit: React.FormEventHandler;
  control: Control<SignInYup, any>;
  validationErrors: FieldErrors<SignInYup>;
}

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const SignInForm: FC<SignInFormProps> = ({
  onSubmit,
  control,
  validationErrors,
}) => {
  const navigate = useNavigate();

  return (
    <StyledCenteredBox my={8} mx={4}>
      <IconTitle title="Sign in" Icon={LockOutlinedIcon} />
      <form noValidate onSubmit={onSubmit}>
        <CustomTextField
          type="Email"
          control={control}
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message}
        />
        <PasswordField
          control={control}
          label="Password"
          autoComplete="current-password"
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message}
        />
        <StyledButton type="submit" fullWidth variant="contained">
          Sign In
        </StyledButton>
        <StyledContainer>
          <CustomLink
            text="Don't have an account? Sign Up"
            onClick={() => navigate("/auth/signup/")}
          />
          <CustomLink
            text="Forgot password?"
            onClick={() => navigate("/auth/forgot/")}
          />
        </StyledContainer>
      </form>
    </StyledCenteredBox>
  );
};

export default SignInForm;
