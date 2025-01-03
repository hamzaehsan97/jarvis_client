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

const HoursOfOperation = (props) => {
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
        <Box>
            <>Hours of Operation go here</>
        </Box>
    );
};

export default HoursOfOperation;
