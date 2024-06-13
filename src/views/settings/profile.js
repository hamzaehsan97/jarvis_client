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

const Profile = () => {
    const navigate = useNavigate();
    const { user, userObject } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false);
    const [rows, setRows] = useState([{ id: 0 }]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openPasswordReset, setOpenPasswordReset] = useState(false);
    const handleOpen = () => setOpenPasswordReset(true);
    const handleClose = () => setOpenPasswordReset(false);
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

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const errorHandle = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const sendPasswordEmail = async function () {
        axios
            .patch('https://logic-theorist.com/users/otp?email=' + user, config)
            .then((result) => {
                setSnackbar({ children: result.data.message, severity: 'success' });
                sleep(2500).then(() => {
                    setOpenPasswordReset(true);
                    // navigate('/password-reset');
                });
            })
            .catch((error) => {
                errorHandle(error);
            });
    };
    return (
        <MainCard title="Profile">
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={{ xs: 1, md: 2 }}
                        columns={{ xs: 2, sm: 3, md: 4 }}
                    >
                        <Grid item>
                            <TextField
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"
                                value={userObject.first_name}
                                style={{ marginRight: 5 + 'px' }}
                                disabled={disableForm}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Last Name"
                                variant="outlined"
                                value={userObject.last_name}
                                style={{ marginRight: 5 + 'px' }}
                                disabled={disableForm}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                value={userObject.email}
                                style={{ marginRight: 5 + 'px' }}
                                disabled={disableForm}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Phone Number"
                                variant="outlined"
                                value={userObject.phone_number}
                                style={{ marginRight: 5 + 'px' }}
                                disabled={disableForm}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={sendPasswordEmail}>
                                Reset Password
                            </Button>
                        </Grid>
                        <Grid item>
                            {/* <Button onClick={handleOpen}>Open modal</Button> */}
                            <Modal
                                open={openPasswordReset}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Reset Account Password
                                    </Typography>
                                    <PasswordResetForm />
                                </Box>
                            </Modal>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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
        </MainCard>
    );
};

export default Profile;
