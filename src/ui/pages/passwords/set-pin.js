// material-ui
import { Button, Typography } from '@mui/material';
import React from 'react';
// project imports
import MainCard from 'ui/components/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import sha256 from 'crypto-js/sha256';
import { Paper } from '@mui/material';
import CryptoJS from 'crypto-js';
import { useContext } from 'react';
import UserContext from 'UserContext';
const SetPin = () => {
    const { secretKey } = useContext(UserContext);
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const token = localStorage.getItem('token');
    const [pin, setPin] = useState(null);
    const config = {
        headers: {
            token: token
        }
    };
    const handlePinUpdate = (e) => {
        setPin(e.target.value);
    };
    const setPinRequest = () => {
        axios
            .post('https://logic-theorist.com/shared/users/secret?secret=' + pin, {}, config)
            .then((res) => {
                setSnackbar({ children: 'Secret saved successfully', severity: 'success' });
            })
            .catch((error) => {
                setSnackbar({ children: error.message, severity: 'error' });
            });
    };
    return (
        <Paper>
            <Grid container direction="column" alignContent="center" spacing={2} style={{ padding: 10 + 'px', margin: 10 + 'px' }}>
                <Grid item>
                    <h2>Set Secret Key</h2>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item>
                            <TextField id="outlined-basic" label="Decryption Pin" variant="outlined" onChange={handlePinUpdate} />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={setPinRequest}>
                                submit
                            </Button>
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
        </Paper>
    );
};

export default SetPin;
