import React from 'react';
import { useForm } from 'react-hook-form';
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
import { yupResolver } from '@hookform/resolvers/yup';

const defaultTheme = createTheme();

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register, formState: { errors } } = useForm<ResetPasswordDto>({
    resolver: yupResolver(resetValidationSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: ResetPasswordDto) => {
    const resetData: ResetPasswordDto = {
      password: data.password,
      confirmPassword: data.confirmPassword
    };

    const response = await dispatch<any>(resetPassword(resetData));

    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/auth/login');
    }

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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}