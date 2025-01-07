import React from 'react';
import ServiceCard from '../components/serviceCard';
import SubCard from '../../../components/cards/SubCard';
import Grid from '@mui/material/Grid';
import {
    IconKey,
    IconDeviceLandlinePhone,
    IconRobot,
    IconBrandOnedrive,
    IconMoodSmile,
    IconDialpad,
    IconNotes,
    IconCloudLock,
    IconSettings,
    IconMail,
    IconDeviceMobileMessage
} from '@tabler/icons';

const icons = {
    IconKey,
    IconDeviceLandlinePhone,
    IconRobot,
    IconBrandOnedrive,
    IconMoodSmile,
    IconDialpad,
    IconNotes,
    IconCloudLock,
    IconSettings,
    IconMail,
    IconDeviceMobileMessage
};

const Services = () => {
    return (
        <SubCard title="Services">
            <Grid container direction={'row'} spacing={1}>
                <Grid item xs={6}>
                    <ServiceCard name="Phone Support" serviceUrl="/call-centers" icons={icons.IconDeviceLandlinePhone} />
                </Grid>
                <Grid item xs={6}>
                    <ServiceCard name="Email Campaigns" serviceUrl="/settings" icons={icons.IconMail} />
                </Grid>
                <Grid item xs={6}>
                    <ServiceCard name="Notes" serviceUrl="/notes" icons={icons.IconNotes} />
                </Grid>
                <Grid item xs={6}>
                    <ServiceCard name="SMS Campaigns" serviceUrl="/settings" icons={icons.IconDeviceMobileMessage} />
                </Grid>
                <Grid item xs={6}>
                    <ServiceCard name="Passwords" serviceUrl="/passwords" icons={icons.IconCloudLock} />
                </Grid>
                <Grid item xs={6}>
                    <ServiceCard name="Settings" serviceUrl="/settings" icons={icons.IconSettings} />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default Services;
