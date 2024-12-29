import React from 'react';
import ServiceCard from '../components/serviceCard';
import SubCard from '../../../components/cards/SubCard';
import Grid from '@mui/material/Grid';

const Services = () => {
    return (
        <SubCard title="Services">
            <Grid container direction={'row'} style={{ margin: 10 }}>
                <Grid item xs={6}>
                    <Grid container direction="column">
                        <Grid item>
                            <ServiceCard name="Call Center" serviceUrl="/call-center" />
                        </Grid>
                        <Grid item>
                            <ServiceCard name="Notes" serviceUrl="/notes" />
                        </Grid>
                        <Grid item>
                            <ServiceCard name="Passwords" serviceUrl="/passwords" />
                        </Grid>
                        <Grid item>
                            <ServiceCard name="Settings" serviceUrl="/settings" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default Services;
