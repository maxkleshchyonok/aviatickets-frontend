import React, { FC } from "react";
import { TextField as MUITextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { camelize } from "app/utils/camelize";

interface CustomTextFieldProps extends TextFieldProps<"standard"> {
  type: string;
  control: Control<any, any>;
}

const TextField: FC<CustomTextFieldProps & TextFieldProps> = ({
  type,
  control,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={camelize(type)}
      render={({ field }) => (
        <MUITextField
          {...props}
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

export default TextField;
