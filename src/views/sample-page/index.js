// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    }
];

const SamplePage = () => {
    const [rows, setRows] = useState([{ id: 0 }]);
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
    }, []);

    return (
        <MainCard title="Notes">
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </MainCard>
    );
};

export default SamplePage;
