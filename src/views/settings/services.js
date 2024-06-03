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
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Profile = () => {
    const navigate = useNavigate();
    const { userObject } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false);
    const [notes, setNotes] = useState(false);
    const [passwords, setPasswords] = useState(false);
    const [finance, setFinance] = useState(false);

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            token: token
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // const service_list = userObject.services;
        async function fetchData() {
            const req = 'http://jarvisloadbalancer-800577279.us-west-2.elb.amazonaws.com:8080/services';
            axios
                .get(req, config)
                .then((result) => {
                    setNotes(result.data.notes);
                    setPasswords(result.data.passwords);
                    setFinance(result.data.finance);
                })
                .catch((error) => {
                    // console.log('err', error);
                });
        }
        fetchData();
    }, [refresh]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const errorHandle = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const updateServices = async (service_name, status) => {
        const req =
            'http://jarvisloadbalancer-800577279.us-west-2.elb.amazonaws.com:8080/services?service=' + service_name + '&active=' + status;
        axios
            .post(req, {}, config)
            .then((result) => {
                setRefresh(!refresh);
                return true;
            })
            .catch((error) => {
                return false;
            });
    };

    const handleChange = async (event) => {
        const changed = await updateServices(event.target.name, event.target.checked);
        if (changed == true) {
            if (event.target.name === 'notes') {
                setNotes(!notes);
            } else if (event.target.name === 'passwords') {
                setPasswords(!passwords);
            } else if (event.target.name === 'finance') {
                setFinance(!finance);
            }
        }
    };

    return (
        <MainCard title="Services">
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Activate/De-activate Services</FormLabel>
                        <FormGroup aria-label="position">
                            <FormControlLabel
                                value="notes"
                                control={<Switch color="primary" checked={notes} />}
                                onChange={handleChange}
                                label="Notes"
                                name="notes"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="passwords"
                                onChange={handleChange}
                                control={<Switch color="primary" checked={passwords} />}
                                label="Passwords"
                                name="passwords"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="finance"
                                onChange={handleChange}
                                control={<Switch color="primary" checked={finance} />}
                                label="Finance"
                                name="finance"
                                labelPlacement="end"
                            />
                        </FormGroup>
                    </FormControl>
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
