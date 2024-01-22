import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{8,}/g,
      "Weak password!"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const forgotValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{8,}/g,
      "Weak password!"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{8,}/g,
      "Weak password!"
    ),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{8,}/g,
      "Weak password!"
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export type ChangePasswordYup = Yup.InferType<
  typeof changePasswordValidationSchema
>;
export type SignUpYup = Yup.InferType<typeof signUpValidationSchema>;
export type SignInYup = Yup.InferType<typeof signInValidationSchema>;
export type ForgotPasswordYup = Yup.InferType<typeof forgotValidationSchema>;
export type ResetPasswordYup = Yup.InferType<typeof resetValidationSchema>;
