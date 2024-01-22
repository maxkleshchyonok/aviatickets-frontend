import React, { FC } from "react";
import IconTitle from "../icon-title.comp";
import PasswordField from "../password-field.comp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { StyledCenteredBox } from "../styled-centered-box.comp";
import { ChangePasswordYup } from "../../validation-schemas/functions";
import { Control, FieldErrors } from "react-hook-form";
import { StyledButton } from "../styled-button.comp";

interface ChangePasswordFormProps {
  onSubmit: React.FormEventHandler;
  control: Control<ChangePasswordYup, any>;
  validationErrors: FieldErrors<ChangePasswordYup>;
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  onSubmit,
  control,
  validationErrors,
}) => {
  return (
    <StyledCenteredBox mt={8}>
      <IconTitle title="Change Password" Icon={AssignmentIcon} />
      <form noValidate onSubmit={onSubmit}>
        <PasswordField
          control={control}
          label="Old password"
          autoComplete="old-password"
          error={!!validationErrors.oldPassword}
          helperText={validationErrors.oldPassword?.message}
        />
        <PasswordField
          control={control}
          label="New Password"
          autoComplete="new-password"
          error={!!validationErrors.newPassword}
          helperText={validationErrors.newPassword?.message}
        />
        <PasswordField
          control={control}
          label="Confirm New Password"
          autoComplete="confirm-password"
          error={!!validationErrors.confirmNewPassword}
          helperText={validationErrors.confirmNewPassword?.message}
        />
        <StyledButton type="submit" fullWidth variant="contained">
          Change password
        </StyledButton>
      </form>
    </StyledCenteredBox>
  );
};

export default ChangePasswordForm;
