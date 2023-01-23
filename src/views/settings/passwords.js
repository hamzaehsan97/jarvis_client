// material-ui
import { Typography } from '@mui/material';
import React from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import UserContext from 'UserContext';
import UpdateUser from './components/updateUser';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import PasswordResetForm from 'views/pages/authentication/auth-forms/PasswordResetForm';
import ResetSecretForm from './components/resetSecretForm';
const Passwords = (props) => {
    const navigate = useNavigate();
    const { user, userObject } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false);
    const [rows, setRows] = useState([{ id: 0 }]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openResetSecret, setOpenResetSecret] = useState(false);
    const handleOpen = () => setOpenResetSecret(true);
    const handleClose = () => setOpenResetSecret(false);
    const [disableForm, setDisableForm] = useState(true);
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
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            token: token
        }
    };

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // const sendPasswordEmail = async function () {
    //     axios
    //         .patch('https://jarvis-backend-test.herokuapp.com/users/otp?email=' + user, config)
    //         .then((result) => {
    //             console.log('result', result);
    //             setSnackbar({ children: result.data.message, severity: 'success' });
    //             sleep(2500).then(() => {
    //                 setOpenPasswordReset(true);
    //                 // navigate('/pages/settings/password');
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             errorHandle(error);
    //         });
    // };
    return (
        <MainCard title="Passwords">
            {props.active === true ? (
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="caption">
                            Your account's secret pin is used to decrypt any form of encrypted data for your account.
                            <br /> Changing your pin wont help you decrypt data encrypted with previous secret pin.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <br />
                        <Button variant="contained" onClick={handleOpen}>
                            <strong>Reset Secret Pin</strong>
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <h3>Service not activated</h3>
            )}

            <Modal
                open={openResetSecret}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Reset Secret Pin
                    </Typography>
                    <ResetSecretForm />
                </Box>
            </Modal>
        </MainCard>
    );
};

export default Passwords;
