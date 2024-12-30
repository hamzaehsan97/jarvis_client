import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
    '& .MuiListItemText-primary': {
        fontWeight: theme.typography.fontWeightMedium
    }
}));

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
                    name: campaign.campaignName.S,
                    status: campaign.campaignStatus.S,
                    id: campaign.campaignID.S
                }));
                setCampaignsList(mappedCampaigns);
            });
    }, [updatePage]);

    // Sample campaigns data
    const campaigns = [
        { id: 1, name: 'Campaign 1' },
        { id: 2, name: 'Campaign 2' },
        { id: 3, name: 'Campaign 3' }
    ];

    const handleDeleteCampaign = (campaignId) => {
        axios
            .delete('https://logic-theorist.com/amazon-connect/campaigns?campaignID=' + campaignId, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            })
            .then((response) => {
                console.log(response);
                setUpdatePage(true);
            })
            .catch((error) => {
                console.log(error);
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
                            <ListItemText primary={campaign.name} />
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
