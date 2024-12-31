import React, { useState } from 'react';
import SubCard from '../../components/cards/SubCard';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CreateCampaignForm from './components/createCampaignForm';
import ListCampaigns from './components/listCampaigns';

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

const Campaigns = () => {
    const [createCampaign, setCreateCampaign] = useState(false);
    const handleOpen = () => setCreateCampaign(true);
    const handleClose = () => setCreateCampaign(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 10
    };
    return (
        <div>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Create Call Center
                </Button>
            </Box>
            <ListCampaigns />
            <Modal
                open={createCampaign}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <SubCard title="Create a Call Center" darkTitle={true}>
                        <CreateCampaignForm />
                    </SubCard>
                </Box>
            </Modal>
        </div>
    );
};

export default Campaigns;
