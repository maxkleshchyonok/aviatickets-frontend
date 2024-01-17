import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
import { ChangePasswordDto, ResetPasswordDto } from 'app/auth/types/types';
import { changePassword, resetPassword } from 'app/auth/store/auth.actions';
import { changePasswordValidationSchema, resetValidationSchema } from 'app/auth/validation-schemas/functions';

const defaultTheme = createTheme();

export function ChangePasswordPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmit = async (values: ChangePasswordDto) => {
		const changeData: ChangePasswordDto = {
			oldPassword: values.oldPassword,
			newPassword: values.newPassword,
			confirmNewPassword: values.confirmNewPassword,
		};

		console.log(changeData);

		await dispatch<any>(changePassword(changeData)).then(() => {
			navigate('');
		});
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
					<Formik
						initialValues={{
							oldPassword: '',
							newPassword: '',
							confirmNewPassword: '',
						}}
						validationSchema={changePasswordValidationSchema}
						onSubmit={handleSubmit}
					>
						{(formik) => (
							<Form noValidate>
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									name="oldPassword"
									label="Old Password"
									type={showOldPassword ? 'text' : 'password'}
									id="oldPassword"
									autoComplete="old-password"
									error={formik.touched.oldPassword && formik.errors.oldPassword}
									helperText={formik.touched.oldPassword && formik.errors.oldPassword}
									InputProps={{
										endAdornment: (
											<div onClick={handleToggleOldPasswordVisibility} style={{ cursor: 'pointer' }}>
												{showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
											</div>
										),
									}}
								/>
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									name="newPassword"
									label="New Password"
									type={showNewPassword ? 'text' : 'password'}
									id="newPassword"
									autoComplete="new-password"
									error={formik.touched.newPassword && formik.errors.newPassword}
									helperText={formik.touched.newPassword && formik.errors.newPassword}
									InputProps={{
										endAdornment: (
											<div onClick={handleToggleNewPasswordVisibility} style={{ cursor: 'pointer' }}>
												{showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
											</div>
										),
									}}
								/>
								<Field
									as={TextField}
									margin="normal"
									required
									fullWidth
									name="confirmNewPassword"
									label="Confirm New Password"
									type={showConfirmPassword ? 'text' : 'password'}
									id="confirmNewPassword"
									autoComplete="confirm-password"
									error={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
									helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
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
							</Form>
						)}
					</Formik>
				</Box>
			</Container>
		</ThemeProvider>
	);
}