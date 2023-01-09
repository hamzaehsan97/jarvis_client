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

const SamplePage = () => {
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

    const useFakeMutation = () => {
        return React.useCallback(
            (user) =>
                new Promise((resolve, reject) => {
                    const identity = user._id;
                    const content = user.content;
                    const type = user.type;
                    const req =
                        'https://jarvis-backend-test.herokuapp.com/texties?content=' + content + '&id=' + identity + '&type=' + type;
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
            .post('https://jarvis-backend-test.herokuapp.com/texties?content=' + '', {}, config)
            .then((result) => {
                setSelectedRows([]);
                setRefresh(!refresh);
            })
            .catch((err) => console.log('error', err));
    };

    const deleteNote = () => {
        const selectedRowsData = selectedRows.map((id) => rows.find((row) => row.id === id));
        selectedRowsData.forEach(function (val, index) {
            const delete_id = val._id;
            axios
                .delete('https://jarvis-backend-test.herokuapp.com/texties?id=' + delete_id, config)
                .then((result) => {
                    console.log('result', result);
                    setSelectedRows([]);
                    setRefresh(!refresh);
                })
                .catch((error) => console.log('error', error));
        });
        console.log(selectedRowsData);
    };

    return (
        <MainCard title="Notes">
            <IconButton aria-label="add" color="primary" onClick={addNote}>
                <AddBoxIcon />
            </IconButton>
            <IconButton aria-label="add" color="error" onClick={deleteNote}>
                <DeleteIcon />
            </IconButton>
            <Box sx={{ height: 400, width: '100%' }}>
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
    );
};

export default SamplePage;
