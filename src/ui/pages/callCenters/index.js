import React, { useState } from 'react';
import MainCard from '../../components/cards/MainCard';
import Campaigns from './campaigns';

const CallCenters = () => {
    return (
        <MainCard title="Call Centers">
            <Campaigns />
        </MainCard>
    );
};

export default CallCenters;
