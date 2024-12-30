import React, { useState } from 'react';
import SubCard from '../../../components/cards/SubCard';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CreateCampaignForm from './createCampaignForm';
import ListCampaigns from './listCampaigns';

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
            <Button variant="text" onClick={handleOpen}>
                Create a campaign
            </Button>
            <ListCampaigns />
            <Modal
                open={createCampaign}
                aria-labelledby="modal-modal-title"
                onClose={handleClose}
                aria-describedby="modal-modal-description"
            >
                <SubCard title="Create a campaign" darkTitle={true} sx={style}>
                    <CreateCampaignForm />
                </SubCard>
            </Modal>
        </div>
    );
};

export default Campaigns;
