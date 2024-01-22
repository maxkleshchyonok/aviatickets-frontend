import React, { FC } from "react";
import IconTitle from "../icon-title.comp";
import PasswordField from "../password-field.comp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { StyledCenteredBox } from "../styled-centered-box.comp";
import { ResetPasswordFormYup } from "../../validation-schemas/reset-password-form.schema";
import { Control, FieldErrors } from "react-hook-form";
import { StyledButton } from "../styled-button.comp";
import { useNavigate } from "react-router-dom";
import CustomLink from "../custom-link.comp";

interface ResetPasswordFormProps {
  onSubmit: React.FormEventHandler;
  control: Control<ResetPasswordFormYup, any>;
  validationErrors: FieldErrors<ResetPasswordFormYup>;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  onSubmit,
  control,
  validationErrors,
}) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate("/auth/signin");
  };

  return (
    <StyledCenteredBox mt={8}>
      <IconTitle title="Reset Password" Icon={AssignmentIcon} />
      <form noValidate onSubmit={onSubmit}>
        <PasswordField
          control={control}
          label="password"
          autoComplete="current-password"
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message}
        />
        <PasswordField
          control={control}
          label="Confirm Password"
          autoComplete="confirm-password"
          error={!!validationErrors.confirmPassword}
          helperText={validationErrors.confirmPassword?.message}
        />
        <StyledButton type="submit" fullWidth variant="contained">
          Change password
        </StyledButton>
        <CustomLink text="Back to login" onClick={handleLinkClick} />
      </form>
    </StyledCenteredBox>
  );
};

export default ResetPasswordForm;
