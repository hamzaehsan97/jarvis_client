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
const Profile = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false);
    const [rows, setRows] = useState([{ id: 0 }]);
    const [selectedRows, setSelectedRows] = useState([]);
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            token: token
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        async function fetchData() {
            axios
                .get('https://jarvis-backend-test.herokuapp.com/texties', config)
                .then((result) => {
                    let collectRows = [];
                    result.data.forEach(function (val, index) {
                        collectRows.push({ id: index, ...val });
                    });
                    setRows(collectRows);
                })
                .catch((error) => {
                    console.log(error);
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

    const sendPasswordEmail = async function () {
        axios
            .patch('https://jarvis-backend-test.herokuapp.com/users/otp?email=' + user, config)
            .then((result) => {
                console.log('result', result);
                setSnackbar({ children: result.data.message, severity: 'success' });
                sleep(2500).then(() => {
                    navigate('/pages/settings/password');
                });
            })
            .catch((error) => {
                console.log(error);
                errorHandle(error);
            });
    };
    return (
        <MainCard title="Profile">
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Button variant="contained" onClick={sendPasswordEmail}>
                        Reset Password
                    </Button>
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
