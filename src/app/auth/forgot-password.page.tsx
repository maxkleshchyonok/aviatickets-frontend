import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { forgotPassword } from 'app/auth/store/auth.actions';
import { ForgotPasswordDto } from 'app/auth/types/types';
import { useNavigate } from 'react-router-dom';
import { forgotValidationSchema } from 'app/auth/validation-schemas/functions';
import { v4 as uuidv4 } from 'uuid';

const defaultTheme = createTheme();

export function ForgotPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values: { email: string}) => {

        let device = localStorage.getItem('device_id');

        if (!device) {
            device = uuidv4();
            localStorage.setItem('device_id', device);
        }
        

        const forgotData: ForgotPasswordDto = {
            deviceId: device,
            email: values.email,
        };


        await dispatch<any>(forgotPassword(forgotData)).then(() => {
            navigate('/auth/verify/');
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
                        Forgot password?
                    </Typography>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={forgotValidationSchema}
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Next
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/auth/signin" variant="body2">
                                            {"Back to sign in"}
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