import React, { useState } from 'react';
import MainCard from '../../../components/cards/MainCard';
import { useLocation } from 'react-router-dom';
import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ManualFlowForm from './manualFlowForm';
import TemplateFlowForm from './templateFlowForm';
import GenAiFlowForm from './genAiFlowForm';

const CreateFlow = () => {
    const [formType, setFormType] = React.useState('templates');
    const selectFormType = (event, formType) => {
        setFormType(formType);
    };
    const returnForm = (formType) => {
        switch (formType) {
            case 'manual':
                return <ManualFlowForm />;
            case 'templates':
                return <TemplateFlowForm />;
            case 'genai':
                return <GenAiFlowForm />;
            default:
                return <ManualFlowForm />;
        }
    };

    return (
        <MainCard title="Create Communication Workflow">
            <Grid container direction={'column'} spacing={2} alignItems={'center'}>
                <Grid item>
                    <ToggleButtonGroup value={formType} exclusive onChange={selectFormType} aria-label="text formType">
                        <ToggleButton value="manual" aria-label="manual">
                            <Typography>Manual Creation</Typography>
                        </ToggleButton>
                        <ToggleButton value="templates" aria-label="templates">
                            <Typography>Use Templates (Preferred)</Typography>
                        </ToggleButton>
                        <ToggleButton value="genai" aria-label="genai">
                            <Typography>Use Gen AI</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} md={12} sx={{ width: 80 + '%' }}>
                    {returnForm(formType)}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CreateFlow;
