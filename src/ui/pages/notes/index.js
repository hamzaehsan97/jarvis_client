// material-ui
import { Typography } from '@mui/material';
import React from 'react';
// project imports
import MainCard from '../../components/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import UserContext from '../../../UserContext';
const columns = [
    { field: 'id', headerName: 'ID', width: 30, hide: true },
    {
        field: 'content',
        headerName: 'Content',
        width: 800,
        editable: true
    },
    {
        field: 'type',
        headerName: 'Type',
        type: 'text',
        width: 120,
        editable: true
    },
    {
        field: 'date',
        headerName: 'Creation Date',
        width: 120,
        editable: true
    },
    {
        field: 'creationTime',
        headerName: 'Time',
        width: 150,
        editable: true,
        hide: true
    },
    {
        field: '_id',
        headerName: 'IDENTITY',
        width: 150,
        editable: true,
        hide: true
    }
];

const Notes = () => {
    const [refresh, setRefresh] = useState(false);
    const [rows, setRows] = useState([{ id: 0 }]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [noteSearch, setNoteSearch] = useState('');
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            token: token
        }
    };
    const { openSnackBar } = useContext(UserContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        async function fetchData() {
            const noteSearhcReq = noteSearch ? '?content=' + noteSearch : '';
            axios
                .get('https://logic-theorist.com/texties' + noteSearhcReq, config)
                .then((result) => {
                    let collectRows = [];
                    result.data.forEach(function (val, index) {
                        collectRows.push({ id: index, ...val });
                    });
                    setRows(collectRows);
                })
                .catch((error) => {
                    openSnackBar({ children: error.response.data.message, severity: 'error' });
                });
        }
        fetchData();
    }, [refresh, noteSearch]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const useFakeMutation = () => {
        return React.useCallback(
            (user) =>
                new Promise((resolve, reject) => {
                    const identity = user._id;
                    const content = user.content;
                    const type = user.type;
                    const req = 'https://logic-theorist.com/texties?content=' + content + '&id=' + identity + '&type=' + type;
                    axios
                        .patch(req, {}, config)
                        .then((result) => {
                            resolve({ ...user, name: user.name?.toUpperCase() });
                        })
                        .catch((error) => {
                            reject(openSnackBar({ children: error.response.data.message, severity: 'error' }));
                        });
                }),
            []
        );
    };

    const mutateRow = useFakeMutation();

    const processRowUpdate = React.useCallback(
        async (newRow) => {
            // Make the HTTP request to save in the backend
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
            .post('https://logic-theorist.com/texties?content=' + '', {}, config)
            .then((result) => {
                setSelectedRows([]);
                setRefresh(!refresh);
            })
            .catch((err) => openSnackBar({ children: err.response.data.message, severity: 'error' }));
    };

    const deleteNote = () => {
        const selectedRowsData = selectedRows.map((id) => rows.find((row) => row.id === id));
        selectedRowsData.forEach(function (val, index) {
            const delete_id = val._id;
            axios
                .delete('https://logic-theorist.com/texties?id=' + delete_id, config)
                .then((result) => {
                    setSelectedRows([]);
                    setRefresh(!refresh);
                })
                .catch((error) => openSnackBar({ children: error.response.data.message, severity: 'error' }));
        });
    };

    const handleNoteSearchChange = (e) => {
        setNoteSearch(e.target.value);
    };

    return (
        <MainCard title="Notes">
            <Grid container direction="row" style={{ margin: 10 }}>
                <Grid item xs={2}>
                    <IconButton aria-label="add" color="primary" onClick={addNote}>
                        <AddBoxIcon />
                    </IconButton>
                    <IconButton aria-label="add" color="error" onClick={deleteNote}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="Search Notes" variant="outlined" onChange={handleNoteSearchChange} fullWidth />
                </Grid>
            </Grid>

            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'creationTime', sort: 'desc' }]
                        }
                    }}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
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

export default Notes;
