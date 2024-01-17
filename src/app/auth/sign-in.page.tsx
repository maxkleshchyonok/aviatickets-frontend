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
import { loginUser } from 'app/auth/store/auth.actions';
import { CreateUserDto } from 'app/auth/types/types';
import { useNavigate } from 'react-router-dom';
import { signInValidationSchema } from 'app/auth/validation-schemas/functions';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';

const defaultTheme = createTheme();

export function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values: { email: string, password: string }) => {
    let device = localStorage.getItem('device_id');

    if (!device) {
      device = uuidv4();
      localStorage.setItem('device_id', device);
    }

    const loginData: CreateUserDto = {
      email: values.email,
      password: values.password,
    };

    const response = await dispatch<any>(loginUser(loginData));
    if (response.meta.requestStatus == 'fulfilled') {
			navigate('/fleght-search');
		}
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpapersmug.com/download/3840x2400/72108f/aircraft-sky-trail.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography component="h1" variant="h1" sx={{ paddingTop: '15vh', color: 'white', fontWeight: '200' }}>
            Avia Finder
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={signInValidationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/auth/signup" variant="body2">
                        Don't have an account? Sign Up
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/auth/forgot" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}