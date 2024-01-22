import React, { FC } from "react";
import IconTitle from "../icon-title.comp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { StyledCenteredBox } from "../styled-centered-box.comp";
import { ForgotPasswordYup } from "../../validation-schemas/functions";
import { Control, FieldErrors } from "react-hook-form";
import { StyledButton } from "../styled-button.comp";
import CustomLink from "../custom-link.comp";
import CustomTextField from "../custom-text-field.comp";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordFormProps {
  onSubmit: React.FormEventHandler;
  control: Control<ForgotPasswordYup, any>;
  validationErrors: FieldErrors<ForgotPasswordYup>;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSubmit,
  control,
  validationErrors,
}) => {
  const navigate = useNavigate();
  return (
    <StyledCenteredBox mt={8}>
      <IconTitle title="Forgot password?" Icon={AssignmentIcon} />
      <form noValidate onSubmit={onSubmit}>
        <CustomTextField
          control={control}
          type="Email"
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message}
        />
        <StyledButton type="submit" variant="contained">
          Next
        </StyledButton>
        <CustomLink
          text="Back to sign in"
          onClick={() => navigate("/auth/signin")}
        />
      </form>
    </StyledCenteredBox>
  );
};

export default ForgotPasswordForm;
