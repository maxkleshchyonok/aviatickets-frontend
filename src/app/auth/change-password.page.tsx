import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordDto } from 'app/auth/types/types';
import { changePassword } from 'app/auth/store/auth.actions';
import { changePasswordValidationSchema } from 'app/auth/validation-schemas/functions';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultTheme = createTheme();

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleSubmit, register, formState: { errors } } = useForm<ChangePasswordDto>({
    resolver: yupResolver(changePasswordValidationSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: ChangePasswordDto) => {
    const changeData: ChangePasswordDto = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };

    const response = await dispatch<any>(changePassword(changeData));

  };

  const handleToggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            Change Password
          </Typography>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Old Password"
              type={showOldPassword ? 'text' : 'password'}
              id="oldPassword"
              autoComplete="old-password"
              {...register('oldPassword')}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
              InputProps={{
                endAdornment: (
                  <div onClick={handleToggleOldPasswordVisibility} style={{ cursor: 'pointer' }}>
                    {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              autoComplete="new-password"
              {...register('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              InputProps={{
                endAdornment: (
                  <div onClick={handleToggleNewPasswordVisibility} style={{ cursor: 'pointer' }}>
                    {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              autoComplete="confirm-password"
              {...register('confirmNewPassword')}
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword?.message}
              InputProps={{
                endAdornment: (
                  <div onClick={handleToggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change password
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}