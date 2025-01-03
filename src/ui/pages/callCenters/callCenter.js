import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MainCard from '../../components/cards/MainCard';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ListFlows from './components/listFlows';
import SubCard from '../../components/cards/SubCard';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import HoursOfOperation from './components/hoursOfOperation';
import { height } from '@mui/system';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TtyIcon from '@mui/icons-material/Tty';
const CallCenter = (props) => {
    const location = useLocation();
    const { pathname } = location;

    const [createCampaign, setCreateCampaign] = useState(false);
    const [callCenterId, setCallCenterId] = useState(null);
    const [callCenter, setCallCenter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [flows, setFlows] = useState(null);
    const [updatePage, setUpdatePage] = useState(false);

    const handleOpen = () => setCreateCampaign(true);
    const handleClose = () => setCreateCampaign(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const id = pathname.split('/')[2];
        setCallCenterId(id);

        const controller = new AbortController();
        const fetchCallCenter = async () => {
            try {
                const response = await axios.get(`https://logic-theorist.com/amazon-connect/campaigns?token=${token}&campaignID=${id}`, {
                    signal: controller.signal
                });
                setCallCenter(response.data.Item);
            } catch (err) {
                if (err.name !== 'CanceledError') {
                    setError('Failed to fetch call center details.');
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCallCenter();

        return () => controller.abort(); // Cleanup request on unmount
    }, [pathname, token]);

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

    const designCallButton = () => {
        return (
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: 'space-around',
                    alignItems: 'flex-end'
                }}
            >
                <Grid item>
                    <Button variant="contained">
                        <Typography
                            to={'/call-centers/' + callCenterId + '/create'}
                            sx={{
                                color: 'white',
                                textDecoration: 'none', // Removes the underline
                                '&:hover': {
                                    textDecoration: 'none' // Keeps underline removed on hover
                                }
                            }}
                            component={Link}
                        >
                            Create Workflows
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        );
    };

    const ContactFlowTitle = () => {
        return (
            <Grid container direction={'row'} spacing={1} alignItems={'center'}>
                <Grid item>
                    <TtyIcon />
                </Grid>
                <Grid item>
                    <Typography variant="h4" fontWeight="bold">
                        Communication Workflows
                    </Typography>
                </Grid>
            </Grid>
        );
    };

    const HoursOfOperationTitle = () => {
        return (
            <Grid container direction={'row'} spacing={1} alignItems={'center'}>
                <Grid item>
                    <QueryBuilderIcon />
                </Grid>
                <Grid item>
                    <Typography variant="h4" fontWeight="bold">
                        Hours of Operation
                    </Typography>
                </Grid>
            </Grid>
        );
    };

    return (
        <MainCard title={loading || error ? 'Loading...' : callCenter?.campaignName?.S || 'Call Center Details'}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="150px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            ) : (
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight="bold">
                                Date Created:
                            </Typography>
                            <Typography variant="body2">{callCenter?.dateCreated?.S || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight="bold">
                                Type:
                            </Typography>
                            <Typography variant="body2">{callCenter?.campaignType?.S || 'No type available.'}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight="bold">
                                Status:
                            </Typography>
                            <Typography variant="body2">{callCenter?.campaignStatus?.S || 'No status available.'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" fontWeight="bold">
                                Country:
                            </Typography>
                            <Typography variant="body2">{callCenter?.campaignCountry?.S || 'No country available.'}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            )}
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Grid container direction={'row'} justifyContent={'space-around'} spacing={2}>
                <Grid item xs={12} md={6}>
                    <SubCard title={ContactFlowTitle()} titleChildren={designCallButton()}>
                        <ListFlows />
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title={HoursOfOperationTitle()}>
                        {callCenter && (
                            <HoursOfOperation
                                instanceID={callCenter.connectInstanceID?.S}
                                hoursOfOperationId={callCenter.campaignHrsOfOperation?.S}
                            />
                        )}
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CallCenter;
