import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import CallIcon from '@mui/icons-material/Call';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
    '& .MuiListItemText-primary': {
        fontWeight: theme.typography.fontWeightMedium
    }
}));

const statusColors = {
    draft: 'orange',
    active: '#4BB543',
    inactive: 'red'
};
const typeIcons = {
    VOICE: <CallIcon color="primary" />,
    CHAT: <ChatIcon color="secondary" />,
    EMAIL: <EmailIcon color="action" />
};

const ListCampaigns = () => {
    const [campaignsList, setCampaignsList] = useState(null);
    const [updatePage, setUpdatePage] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        setUpdatePage(false);
        axios
            .get('https://logic-theorist.com/amazon-connect/campaigns/list', {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            })
            .then((response) => {
                console.log(response.data.Items);
                const mappedCampaigns = response.data.Items.map((campaign) => ({
                    id: campaign.campaignID.S,
                    name: campaign.campaignName.S,
                    status: campaign.campaignStatus.S.toLowerCase(),
                    startDate: campaign.campaignStartDate.S,
                    endDate: campaign.campaignEndDate.S,
                    owner: campaign.campaignOwner.S,
                    type: campaign.campaignType.S
                }));
                setCampaignsList(mappedCampaigns);
            })
            .catch((error) => {
                console.error('Error fetching campaigns:', error);
            });
    }, [updatePage]);

    const handleDeleteCampaign = (campaignId) => {
        axios
            .delete(`https://logic-theorist.com/amazon-connect/campaigns?campaignID=${campaignId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            })
            .then((response) => {
                console.log('Deleted:', response);
                setUpdatePage(true);
            })
            .catch((error) => {
                console.error('Error deleting campaign:', error);
            });
    };

    return (
        <div>
            {campaignsList === null ? (
                <Typography>Loading...</Typography>
            ) : (
                <List>
                    {campaignsList.map((campaign) => (
                        <StyledListItem key={campaign.id} divider>
                            <ListItemText
                                primary={campaign.name}
                                secondary={
                                    <Box>
                                        <Typography variant="body2">
                                            Dates: {campaign.startDate} - {campaign.endDate}
                                        </Typography>
                                    </Box>
                                }
                            />
                            <Box display="flex" alignItems="left" gap={2} sx={{ mr: 4 }}>
                                <Chip
                                    label={campaign.status}
                                    style={{
                                        backgroundColor: statusColors[campaign.status],
                                        color: 'white',
                                        textTransform: 'capitalize'
                                    }}
                                />
                                {typeIcons[campaign.type] || <Typography>Unknown Type</Typography>}
                            </Box>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCampaign(campaign.id)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </StyledListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default ListCampaigns;
