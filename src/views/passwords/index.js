// material-ui
import { Button, Typography } from '@mui/material';
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
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import sha256 from 'crypto-js/sha256';
import { Paper } from '@mui/material';
import CryptoJS from 'crypto-js';
import { useContext } from 'react';
import UserContext from 'UserContext';
import SetPin from './set-pin';

const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    {
        field: 'portal',
        headerName: 'Portal',
        type: 'text',
        width: 100,
        editable: true
    },
    {
        field: 'content',
        headerName: 'Password',
        width: 500,
        editable: true
    },
    {
        field: 'type',
        headerName: 'Type',
        type: 'text',
        width: 100,
        editable: true
    },
    {
        field: 'creationTime',
        headerName: 'Time',
        width: 100,
        editable: true
    },
    {
        field: '_id',
        headerName: 'Identity',
        width: 100,
        editable: true
    }
];

const Passwords = () => {
    const [decryptionKey, setDecryptionKey] = useState('0000');
    const [testing, setTesting] = useState('null');
    const [decrypted, setDecrypted] = useState('null');
    const [refresh, setRefresh] = useState(false);
    const [rows, setRows] = useState([{ id: 0 }]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [password, setPassword] = useState('');
    const { secretKey } = useContext(UserContext);
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            token: token
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        async function fetchData() {
            const req = 'https://jarvis-backend-test.herokuapp.com/passwords?key=' + decryptionKey;
            axios
                .get(req, config)
                .then((result) => {
                    console.log('result', result);
                    let collectRows = [];
                    result.data.forEach(function (val, index) {
                        collectRows.push({
                            id: index,
                            ...val
                        });
                    });
                    setRows(collectRows);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchData();
    }, [refresh, decryptionKey]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const useFakeMutation = () => {
        return React.useCallback(
            (user) =>
                new Promise((resolve, reject) => {
                    const identity = user._id;
                    const content = user.content;
                    const type = user.type;
                    const portal = user.portal;
                    const req =
                        'https://jarvis-backend-test.herokuapp.com/passwords?content=' +
                        content +
                        '&id=' +
                        identity +
                        '&type=' +
                        type +
                        '&portal=' +
                        portal;
                    axios
                        .patch(req, {}, config)
                        .then((result) => {
                            resolve({ ...user, name: user.name?.toUpperCase() });
                        })
                        .catch((error) => {
                            console.log(error);
                            reject(new Error("Error while saving user: name can't be empty."));
                        });
                }),
            []
        );
    };

    const mutateRow = useFakeMutation();

    const processRowUpdate = React.useCallback(
        async (newRow) => {
            // Make the HTTP request to save in the backend
            console.log('in here');
            const response = await mutateRow(newRow);
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            return response;
        },
        [mutateRow]
    );

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    const addNote = () => {
        axios
            .post('https://jarvis-backend-test.herokuapp.com/passwords?content=' + '', {}, config)
            .then((result) => {
                setRefresh(!refresh);
            })
            .catch((err) => console.log('error', err));
    };

    const deleteNote = () => {
        const selectedRowsData = selectedRows.map((id) => rows.find((row) => row.id === id));
        selectedRowsData.forEach(function (val, index) {
            const delete_id = val._id;
            axios
                .delete('https://jarvis-backend-test.herokuapp.com/passwords?id=' + delete_id, config)
                .then((result) => {
                    console.log('result', result);
                    setSelectedRows([]);
                    setRefresh(!refresh);
                })
                .catch((error) => {
                    console.log('error', error);
                    setRefresh(!refresh);
                });
        });
        console.log(selectedRowsData);
    };

    const handlePinChange = (e) => {
        setDecryptionKey(e.target.value);
    };

    const handleDataChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div style={{ padding: 10 + 'px' }}>
            {secretKey ? (
                <MainCard title="Passwords">
                    <Grid container spacing={1} styling={{ padding: 20 + 'px' }}>
                        <Grid item xs={1}>
                            <IconButton aria-label="add" color="primary" onClick={addNote}>
                                <AddBoxIcon />
                            </IconButton>
                            <IconButton aria-label="add" color="error" onClick={deleteNote}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" label="Decryption Pin" variant="outlined" onChange={handlePinChange} />
                        </Grid>
                    </Grid>
                    <Box sx={{ height: 400, width: '100%', paddingTop: 20 + 'px' }}>
                        <DataGrid
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'creationTime', sort: 'desc' }]
                                }
                            }}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                            processRowUpdate={processRowUpdate}
                            onProcessRowUpdateError={handleProcessRowUpdateError}
                            experimentalFeatures={{ newEditingApi: true }}
                            onSelectionModelChange={(ids) => setSelectedRows(ids)}
                            selectionModel={selectedRows}
                        />
                    </Box>
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
            ) : (
                <SetPin />
            )}
        </div>
    );
};

export default Passwords;
