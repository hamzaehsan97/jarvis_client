import React, { useState } from 'react';
import MainCard from '../../components/cards/MainCard';
import Campaigns from './campaigns';

const CallCenters = () => {
    return (
        <MainCard>
            <Campaigns />
        </MainCard>
    );
};

export default CallCenters;
