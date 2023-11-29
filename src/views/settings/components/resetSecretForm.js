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

const ResetSecretForm = ({ ...others }) => {
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
                    newSecret: '',
                    confirmSecret: '',
                    otpCode: ''
                }}
                validationSchema={Yup.object().shape({
                    newSecret: Yup.string().required('Secret pin is required'),
                    confirmSecret: Yup.string().when('newSecret', {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf([Yup.ref('newSecret')], 'Secret pins dont match')
                    }),
                    otpCode: Yup.number()
                        .min(1111, 'OTP code must be a 4-digit number')
                        .max(9999, 'OTP code must be a 4-digit number')
                        .required('OTP Code is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    // Make a request for a user with a given ID
                    if (values.newSecret === values.confirmSecret) {
                        console.log('user', user);
                        const req =
                            'https://jarvis-backend-test.herokuapp.com/users/password?email=' +
                            user +
                            '&otp=' +
                            values.otpCode +
                            '&password=' +
                            values.newSecret;
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
                                console.log('error', error);
                                errorHandle(error.response.data.message);
                            });
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.newSecret && errors.newSecret)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-email-login">Secret Pin</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={values.newSecret}
                                name="newSecret"
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
                            {touched.newSecret && errors.newSecret && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.newSecret}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.confirmSecret && errors.confirmSecret)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-email-login">Confirm Secret Pin</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirmSecret}
                                name="confirmSecret"
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
                            {touched.confirmSecret && errors.confirmSecret && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.confirmSecret}
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
                                    disabled={values.newSecret !== values.confirmSecret}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Reset Account Secret
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

export default ResetSecretForm;
