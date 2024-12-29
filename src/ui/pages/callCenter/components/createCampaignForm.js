import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { schema } from '../schema/form-schema/createCampaign'; // Import your schema
import { uiSchema } from '../schema/ui-schema/createCampaign'; // Import your UI schema
import Button from '@mui/material/Button';
import axios from 'axios';

const CreateCampaignForm = () => {
    const initialData = {
        campaignName: 'Your Campaign Name',
        campaignType: 'Inbound',
        campaignStartDate: '2024-08-01',
        campaignEndDate: '2024-08-01',
        campaignStatus: 'Draft',
        campaignRegion: 'us-east-1',
        campaignCountry: 'USA',
        campaignZipCode: 98144
    };
    const [data, setData] = useState(initialData);
    const token = localStorage.getItem('token');

    const CreateCampaign = async (data) => {
        try {
            console.log('Data:', data);
            await axios
                .put('https://logic-theorist.com/amazon-connect/campaigns', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token
                    }
                })
                .then((result) => {
                    console.log('Result:', result);
                })
                .catch((error) => {
                    console.error('Error updating campaign:', error.response ? error.response.data : error.message);
                });

            console.log('Response:', response.data); // Handle the response data
        } catch (error) {
            console.error('Error updating campaign:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <JsonForms
                schema={schema}
                uischema={uiSchema}
                data={data}
                renderers={materialRenderers}
                onChange={({ data, _errors }) => setData(data)}
                onSubmit={({ data, _errors }) => CreateCampaign(data)}
            />
            <Button onClick={() => CreateCampaign(data)} color="primary">
                Create Campaign
            </Button>
        </div>
    );
};

export default CreateCampaignForm;
