import React from 'react';
import UserContext from 'UserContext';
import { useContext, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { TextField, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PasswordResetForm from 'views/pages/authentication/auth-forms/PasswordResetForm';

const UpdateUser = () => {
    const { userObject } = useContext(UserContext);
    const [openPasswordReset, setOpenPasswordReset] = useState(false);
    const handleOpen = () => setOpenPasswordReset(true);
    const handleClose = () => setOpenPasswordReset(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };
    return <MainCard></MainCard>;
};

export default UpdateUser;
