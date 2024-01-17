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
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordDto } from 'app/auth/types/types';
import { resetPassword } from 'app/auth/store/auth.actions';
import { resetValidationSchema } from 'app/auth/validation-schemas/functions';

const defaultTheme = createTheme();

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values: Pick<ResetPasswordDto, 'password' | 'confirmPassword'>) => {
    const resetData: ResetPasswordDto = {
      password: values.password,
      confirmPassword: values.confirmPassword
    };

    await dispatch<any>(resetPassword(resetData)).then(() => {
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
            <AssignmentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validationSchema={resetValidationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
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
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Change password
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/auth/signin" variant="body2">
                      {"Back to login"}
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