import { useState } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UserContext from 'UserContext';
import { Password } from '@mui/icons-material';

// import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const PasswordResetForm = ({ ...others }) => {
    const theme = useTheme();
    const { user, setUser, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const errorHandle = React.useCallback((error) => {
        setSnackbar({ children: error, severity: 'error' });
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    newPassword: '',
                    confirmPassword: '',
                    otpCode: ''
                }}
                validationSchema={Yup.object().shape({
                    newPassword: Yup.string()
                        .required('New Password is required')
                        .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@\$%\^&\*])(?=.{8,})/,
                            'Must Contain 8 Characters, One Uppercase, One Lowercase and One Special Case Character from !@$%^&*'
                        ),
                    confirmPassword: Yup.string().when('newPassword', {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords do not match')
                    }),
                    otpCode: Yup.number()
                        .min(1111, 'OTP code must be a 4-digit number')
                        .max(9999, 'OTP code must be a 4-digit number')
                        .required('OTP Code is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    // Make a request for a user with a given ID
                    if (values.newPassword === values.confirmPassword) {
                        const req =
                            'http://jarvisloadbalancer-800577279.us-west-2.elb.amazonaws.com:8080/users/password?email=' +
                            user +
                            '&otp=' +
                            values.otpCode +
                            '&password=' +
                            values.newPassword;
                        axios
                            .patch(req)
                            .then(function (response) {
                                sleep(2500).then(() => {
                                    setSnackbar({ children: response.data.message, severity: 'success' });
                                    setToken(null);
                                    setUser(null);
                                    navigate('/login');
                                });
                            })
                            .catch(function (error) {
                                errorHandle(error.response.data.message);
                            });
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.newPassword && errors.newPassword)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-email-login">New Password</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={values.newPassword}
                                name="newPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {touched.newPassword && errors.newPassword && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.newPassword}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-email-login">Confirm Password</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                name="confirmPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Confirm Password"
                                inputProps={{}}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.confirmPassword}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.otpCode && errors.otpCode)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-password-login">One Time Code</InputLabel>
                            <OutlinedInput
                                type="text"
                                value={values.otpCode}
                                name="otpCode"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.otpCode && errors.otpCode && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.otpCode}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={values.newPassword !== values.confirmPassword}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Reset Password
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </>
    );
};

export default PasswordResetForm;
