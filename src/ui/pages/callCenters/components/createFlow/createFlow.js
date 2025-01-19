import React, { useState } from 'react';
import MainCard from '../../../../components/cards/MainCard';
import { useLocation } from 'react-router-dom';
import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ManualFlowForm from './manualFlowForm';
import TemplateFlowForm from './templateFlowForm';
import GenAiFlowForm from './genAiFlowForm';
import { useTheme } from '@mui/material/styles';
import BlockBuilder from './blockBuilder/blockBuilder';

const CreateFlow = () => {
    const theme = useTheme();
    const [formType, setFormType] = React.useState('block-builder');
    const selectFormType = (event, formType) => {
        setFormType(formType);
    };
    const returnForm = (formType) => {
        switch (formType) {
            case 'manual':
                return <ManualFlowForm />;
            case 'templates':
                return <TemplateFlowForm />;
            // case 'genai':
            //     return <GenAiFlowForm />;
            case 'block-builder':
                return <BlockBuilder />;
            default:
                return <ManualFlowForm />;
        }
    };

    return (
        <MainCard>
            <Grid container direction={'column'} spacing={2} alignItems={'center'}>
                <Grid item>
                    <ToggleButtonGroup value={formType} exclusive onChange={selectFormType} aria-label="text formType">
                        <ToggleButton value="manual" aria-label="manual">
                            <Typography>Manual Creation</Typography>
                        </ToggleButton>
                        <ToggleButton value="block-builder" aria-label="block-builder">
                            <Typography>
                                Block Builder (
                                <span style={{ color: theme.palette.success.dark }}>
                                    <b>Preferred</b>
                                </span>
                                )
                            </Typography>
                        </ToggleButton>
                        <ToggleButton value="templates" aria-label="templates">
                            <Typography>Use Templates</Typography>
                        </ToggleButton>
                        {/* <ToggleButton value="genai" aria-label="genai">
                            <Typography>Gen AI</Typography>
                        </ToggleButton> */}
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} md={12} sx={{ width: 100 + '%' }}>
                    {returnForm(formType)}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CreateFlow;
