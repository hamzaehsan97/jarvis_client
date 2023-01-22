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

const BankAccountsList = () => {
    return (
        <>
            {/* <Typography style={{ paddingTop: 20 }} variant="h5">
                Connected Bank Accounts
            </Typography> */}
        </>
    );
};

export default BankAccountsList;
