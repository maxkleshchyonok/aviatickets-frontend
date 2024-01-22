import React, { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { camelize } from "app/utils/camelize";

interface CustomTextFieldProps {
  type: string;
  control: Control<any, any>;
}

const CustomTextField: FC<CustomTextFieldProps & TextFieldProps> = ({
  type,
  control,
  ...restProps
}) => {
  return (
    <Controller
      control={control}
      name={camelize(type)}
      render={({ field }) => (
        <TextField
          {...restProps}
          {...field}
          name={type}
          margin="normal"
          fullWidth
          id={camelize(type)}
          autoComplete={camelize(type)}
          label={type}
        />
      )}
    />
  );
};

export default CustomTextField;
