import React, { FC } from "react";
import { TextField, TextFieldProps, styled } from "@mui/material";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { camelize } from "app/utils/camelize";

interface PasswordFieldProps {
  label: string;
  control: Control<any, any>;
}

const PointerDiv = styled("div")({
  cursor: "pointer",
});

const PasswordField: FC<PasswordFieldProps & TextFieldProps> = ({
  label,
  control,
  ...props
}) => {
  const name = camelize(label);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      control={control}
      name={camelize(label)}
      render={({ field }) => (
        <TextField
          {...props}
          margin="normal"
          fullWidth
          label={label}
          {...field}
          type={showPassword ? "text" : "password"}
          id={camelize(label)}
          InputProps={{
            endAdornment: (
              <PointerDiv onClick={handleTogglePasswordVisibility}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </PointerDiv>
            ),
          }}
        />
      )}
    />
  );
};

export default PasswordField;
