import React, { useEffect, useState } from 'react';
import SubCard from '../../../components/cards/SubCard';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ListFlows = () => {
    const location = useLocation();
    const { pathname } = location;

    const [createCampaign, setCreateCampaign] = useState(false);
    const [error, setError] = useState(null);
    const [flows, setFlows] = useState(null);
    const [updatePage, setUpdatePage] = useState(false);

    const handleOpen = () => setCreateCampaign(true);
    const handleClose = () => setCreateCampaign(false);

    const token = localStorage.getItem('token');

    const handleDeleteFlow = async (flowId) => {
        axios
            .delete(`https://logic-theorist.com/amazon-connect/connect/flows?token=${token}&flowID=${flowId}`)
            .then(() => {
                setUpdatePage(true);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        const fetchFlows = async () => {
            try {
                const response = await axios.get(`https://logic-theorist.com/amazon-connect/connect/flows/list?token=${token}`);
                setFlows(response.data.Items);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFlows();
    }, [updatePage, token]);

    return (
        <SubCard title="Flows" darkTitle={true}>
            <Box>
                <Grid container spacing={2}>
                    {flows &&
                        flows.map((flow) => (
                            <>
                                <Grid item xs={10} key={flow.flowID.S}>
                                    <Typography variant="body1">Flow Name: {flow.flowName.S}</Typography>
                                    <Typography variant="body2">Flow Description: {flow.flowDescription?.S || 'NA'}</Typography>
                                    <Typography variant="body2">Date Created: {flow.dateCreated.S}</Typography>
                                    <Typography variant="body2">Flow Type: {flow.flowType.S}</Typography>
                                    <Typography variant="subtitle2">Last Updated: {flow.dateUpdated.S}</Typography>
                                    <Typography variant="body2">ID: {flow.flowID.S}</Typography>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDeleteFlow(flow.flowID.S)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </>
                        ))}
                </Grid>
            </Box>
        </SubCard>
    );
};

export default ListFlows;
