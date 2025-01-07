import React from 'react';
import ServiceCard from './components/serviceCard';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import MainCard from '../../components/cards/MainCard';
import SubCard from '../../components/cards/SubCard';
import Grid from '@mui/material/Grid';
import Services from './components/services';
import { gridSpacing } from '../../../configs/store/constant';

const Dashboard = () => {
    const theme = useTheme();

    return (
        <MainCard title="Dashboard">
            <Grid container direction={'row'} spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                    <Services />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Dashboard;
