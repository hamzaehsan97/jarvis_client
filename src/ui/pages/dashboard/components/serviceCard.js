import React from 'react';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubCard from '../../../components/cards/SubCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
const ServiceCard = ({ name, serviceUrl, icons: Icon }) => {
    const navigate = useNavigate();

    return (
        <Box>
            <Link
                component="button"
                variant="body2"
                underline="hover"
                onClick={() => {
                    navigate(serviceUrl);
                }}
                sx={{ width: 100 + '%' }}
            >
                <SubCard>
                    <Grid container direction={'row'} spacing={1}>
                        <Grid item xs={2}>
                            <Icon />
                        </Grid>
                        <Grid item xs={9}>
                            {name}
                        </Grid>
                    </Grid>
                </SubCard>
            </Link>
        </Box>
    );
};

export default ServiceCard;
