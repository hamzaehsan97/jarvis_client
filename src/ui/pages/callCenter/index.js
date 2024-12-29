import React, { useState } from 'react';
import MainCard from '../../components/cards/MainCard';
import Campaigns from './components/campaigns';

const CallCenter = () => {
    return (
        <MainCard title="Call Centers">
            <Campaigns />
        </MainCard>
    );
};

export default CallCenter;
