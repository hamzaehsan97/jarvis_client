import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { schema } from '../schema/form-schema/createCampaign'; // Import your schema
import { uiSchema } from '../schema/ui-schema/createCampaign'; // Import your UI schema
import Button from '@mui/material/Button';
import axios from 'axios';

const defaultInstanceID = '82434149-1844-49cc-af6e-4f40b54df820';
const CreateCampaignForm = () => {
    const initialData = {
        campaignName: '',
        campaignType: 'Inbound',
        campaignStartDate: '',
        campaignEndDate: '',
        campaignStatus: 'Draft',
        campaignRegion: 'us-west-2',
        campaignCountry: 'USA',
        instanceID: defaultInstanceID
    };
    const [data, setData] = useState(initialData);
    const [result, setResults] = useState('');

    const token = localStorage.getItem('token');

    const CreateCampaign = async (data) => {
        data.instanceID = defaultInstanceID;
        await axios
            .put('https://logic-theorist.com/amazon-connect/campaigns', data, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            })
            .then((result) => {
                window.location.reload();
            })
            .catch((error) => {
                setResults(error.response.data);
            });
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
                Create a Call Center
            </Button>
            <div>{result}</div>
        </div>
    );
};

export default CreateCampaignForm;
