import React, { useEffect, useState } from 'react';
import SubCard from '../../../components/cards/SubCard';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import AttachPhoneNumberForm from './attachPhoneNumberForm';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3
};

const ListFlows = (props) => {
    const location = useLocation();
    const { pathname } = location;

    const [attachPhoneNumber, setAttachPhoneNumber] = useState(false);
    const [error, setError] = useState(null);
    const [flows, setFlows] = useState(null);
    const [updatePage, setUpdatePage] = useState(false);
    const [phoneNumberFlowID, setPhoneNumberFlowID] = useState(null);
    const [phoneNumberFlowName, setPhoneNumberFlowName] = useState(null);
    const handleOpen = () => setAttachPhoneNumber(true);
    const handleClose = () => setAttachPhoneNumber(false);

    const token = localStorage.getItem('token');

    const handleAttachPhoneNumber = async (flowId, flowName) => {
        handleOpen();
        setPhoneNumberFlowID(flowId);
        setPhoneNumberFlowName(flowName);
    };

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
        <>
            <List>
                {flows &&
                    flows.map((flow) => (
                        <ListItem key={flow.flowID.S} divider>
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={12} md={5}>
                                    <ListItemText
                                        primary={
                                            <Link to={'flows/' + flow.flowID.S} underline="hover">
                                                <Typography variant="h5">{flow.flowName.S}</Typography>
                                            </Link>
                                        }
                                        secondary={
                                            <>
                                                {/* Description: {flow.flowDescription?.S || 'N/A'} <br />
                                                Date Created: {flow.dateCreated.S} <br />
                                                Flow Type: {flow.flowType.S} <br />
                                                Last Updated: {flow.dateUpdated.S} <br /> */}
                                                ID: {flow.flowID.S}
                                            </>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Grid container direction="row" justifyContent="center">
                                        <Grid item>
                                            {flow.phoneNumber ? (
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
                                                    Phone Number:&nbsp; {flow.phoneNumber.S}
                                                </Typography>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => handleAttachPhoneNumber(flow.flowID.S, flow.flowName.S)}
                                                >
                                                    Attach Phone Number
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
                                            onClick={() => handleEditFlow(flow.flowID.S)}
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteFlow(flow.flowID.S)}
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
            </List>
            <Modal
                open={attachPhoneNumber}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <SubCard title="Attach Phone Number" darkTitle={true}>
                        <AttachPhoneNumberForm flowID={phoneNumberFlowID} flowName={phoneNumberFlowName} />
                    </SubCard>
                </Box>
            </Modal>
        </>
    );
};

export default ListFlows;
