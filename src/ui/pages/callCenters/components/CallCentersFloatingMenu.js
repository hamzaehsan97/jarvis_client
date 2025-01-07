import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconChevronDown } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const CallCentersFloatingMenu = (props) => {
    const theme = useTheme();
    const [callCenterId, setCallCenterId] = useState(null);
    const [updatePage, setUpdatePage] = useState(false);
    const [campaignsList, setCampaignsList] = useState([]);
    const navigate = useNavigate();
    const flowLink = '/call-centers/' + callCenterId + '/create';
    const createAgentsLink = '/call-centers/' + callCenterId + '/agents/create';
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function openCallCenter(id) {
        navigate('/call-centers/' + id, { replace: true });
    }

    const token = localStorage.getItem('token');

    useEffect(() => {
        setUpdatePage(false);
        axios
            .get('https://logic-theorist.com/amazon-connect/campaigns/list', {
                headers: {
                    'Content-Type': 'application/json',
                    token
                }
            })
            .then((response) => {
                const mappedCampaigns = response.data.Items.map((campaign) => ({
                    id: campaign.campaignID?.S,
                    name: campaign.campaignName?.S,
                    status: campaign.campaignStatus?.S.toLowerCase(),
                    startDate: campaign.campaignStartDate?.S,
                    endDate: campaign.campaignEndDate?.S,
                    owner: campaign.campaignOwner?.S,
                    type: campaign.campaignType?.S
                }));
                setCampaignsList(mappedCampaigns);
            })
            .catch((error) => {
                console.error('Error fetching campaigns:', error);
            });
    }, [updatePage]);

    return (
        <>
            {campaignsList.length > 0 ? (
                <>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            color: theme.palette.grey[900], // Set the text color to black
                            // fontWeight: 'bold', // Make the text bold like a title
                            fontSize: '1rem', // Set a larger font size for the title look
                            textTransform: 'none' // Remove uppercase transformation (optional)
                        }}
                    >
                        {props.callCenterName + ' '} <IconChevronDown />
                    </Button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        {campaignsList.map((campaign) => (
                            <MenuItem
                                key={campaign.id}
                                onClick={() => {
                                    openCallCenter(campaign.id);
                                }}
                            >
                                {campaign.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            ) : (
                <MenuItem disabled>No campaigns available</MenuItem>
            )}
        </>
    );
};

export default CallCentersFloatingMenu;
