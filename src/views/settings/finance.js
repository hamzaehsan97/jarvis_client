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

const Finance = () => {
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
    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);
    return (
        <MainCard title="Finance">
            <Grid container direction="column" spacing={2}></Grid>
        </MainCard>
    );
};

export default Finance;
