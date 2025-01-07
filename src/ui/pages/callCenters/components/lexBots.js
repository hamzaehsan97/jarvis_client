import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListBots = (props) => {
    const [agents, setAgents] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCampaignAgents = async () => {
            const data = {
                campaignId: props.campaignId
            };

            try {
                const response = await axios.get(
                    `https://logic-theorist.com/amazon-connect/agents/list?token=${token}&campaignId=${data.campaignId}`
                );
                setAgents(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCampaignAgents();
    }, [token]);

    return (
        <Box>
            {agents ? (
                <Grid container direction="column" spacing={1}>
                    {agents.map((agent) => (
                        <ListItem key={agent.agentId} divider>
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={12} md={4}>
                                    <ListItemText
                                        primary={
                                            <Link to={'agents/' + agent.agentId} underline="hover">
                                                <Typography variant="h5">
                                                    {agent.agentFirstName}&nbsp;{agent.agentLastName}
                                                </Typography>
                                            </Link>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid container direction="row" justifyContent="center">
                                        <Grid item>
                                            {agent.agentPhoneNumber ? (
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    style={{
                                                        textAlign: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    Phone Number:&nbsp; {agent.agentPhoneNumber}
                                                </Typography>
                                            ) : (
                                                <Button variant="outlined" color="primary">
                                                    Agent Phone Number
                                                </Button>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            // onClick={() => handleEditFlow(flow.flowID.S)}
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            // onClick={() => handleDeleteFlow(flow.flowID.S)}
                                            color="error"
                                            sx={{ mr: 1 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </Grid>
            ) : (
                <Typography>Loading ...</Typography>
            )}
        </Box>
    );
};

export default ListBots;
