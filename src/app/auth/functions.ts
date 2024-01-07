import * as Yup from 'yup';

export const SignUpValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .matches(
            /^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
            'Weak password! Minimum 8 characters, 2 numbers, 2 symbols'
        ),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
});