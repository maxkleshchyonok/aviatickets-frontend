import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterUserDto } from 'app/auth/types/types';
import { registerUser } from 'app/auth/store/auth.actions';
import { signUpValidationSchema } from 'app/auth/validation-schemas/functions';
import { v4 as uuidv4 } from 'uuid';

const defaultTheme = createTheme();

export function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values: Pick<RegisterUserDto, 'email' | 'firstName' | 'lastName' | 'password'> ) => {
    let device = localStorage.getItem('device_id');

    if (!device) {
      device = uuidv4();
      localStorage.setItem('device_id', device);
    }

    const registerData: RegisterUserDto = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    await dispatch<any>(registerUser(registerData)).then(() => {
      navigate('/auth/login');
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirm_password: ''
            }}
            validationSchema={signUpValidationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  error={formik.touched.firstName && formik.errors.firstName}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  error={formik.touched.lastName && formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="current-password"
                  error={formik.touched.confirm_password && formik.errors.confirm_password}
                  helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/auth/signin" variant="body2">
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}