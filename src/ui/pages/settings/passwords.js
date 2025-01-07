// material-ui
import { Typography } from '@mui/material';
import React from 'react';
// project imports
import MainCard from '../../components/cards/MainCard';
import Box from '@mui/material/Box';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import UserContext from '../../../UserContext';
import Modal from '@mui/material/Modal';
import ResetSecretForm from './components/resetSecretForm';
const Passwords = (props) => {
    const [openResetSecret, setOpenResetSecret] = useState(false);
    const handleOpen = () => setOpenResetSecret(true);
    const handleClose = () => setOpenResetSecret(false);
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
