// material-ui
import { Typography } from '@mui/material';
import React from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Profile from './profile';
import Finance from './finance';
import Services from './services';
import Passwords from './passwords';
const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    {
        field: 'content',
        headerName: 'Content',
        width: 600,
        editable: true
    },
    {
        field: 'type',
        headerName: 'Type',
        type: 'text',
        width: 80,
        editable: true
    },
    {
        field: 'creationTime',
        headerName: 'Time',
        width: 150,
        editable: true
    },
    {
        field: '_id',
        headerName: 'IDENTITY',
        width: 150,
        editable: true
    }
];

const Settings = () => {
    const [refresh, setRefresh] = useState(false);
    const [services, setServices] = useState({});
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            token: token
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        async function fetchData() {
            const req = 'http://jarvisloadbalancer-800577279.us-west-2.elb.amazonaws.com:8080/services';
            axios
                .get(req, config)
                .then((result) => {
                    setServices(result.data);
                })
                .catch((error) => {
                    console.log('err', error);
                });
        }
        fetchData();
    }, [refresh]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    return (
        <MainCard title="Settings">
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Profile />
                </Grid>
                <Grid item>
                    <Services />
                </Grid>
                <Grid item>
                    <Finance active={services.finance} />
                </Grid>
                <Grid item>
                    <Passwords active={services.passwords} />
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

export default Settings;
