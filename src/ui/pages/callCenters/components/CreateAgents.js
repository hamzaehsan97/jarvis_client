import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { schema } from '../schema/form-schema/createAgent'; // Import your schema
import { uiSchema } from '../schema/ui-schema/createAgent'; // Import your UI schema
import Button from '@mui/material/Button';
import axios from 'axios';
import MainCard from '../../../components/cards/MainCard';
import { useLocation } from 'react-router-dom';

const defaultInstanceID = '82434149-1844-49cc-af6e-4f40b54df820';
const CreateAgents = () => {
    const initialData = {
        contactFlowName: 'Sample Call',
        contactFlowType: 'CONTACT_FLOW',
        contactFlowContent:
            '{"Version":"2019-10-30","StartAction":"1cf78dbd-febf-4604-8351-59740aea1b07","Metadata":{"entryPointPosition":{"x":40,"y":40},"ActionMetadata":{"1cf78dghbbd-febf-4604-8351-59740aea1b07":{"position":{"x":171.2,"y":52.8}}},"Annotations":[],"name":"test","description":"","type":"contactFlow","status":"published","hash":{}},"Actions":[{"Parameters":{},"Identifier":"1cf78dbd-febf-4604-8351-59740aea1b07","Type":"DisconnectParticipant","Transitions":{}}]}',
        flowDescription: 'This is a sample call flow'
    };
    const [data, setData] = useState(initialData);
    const [result, setResults] = useState('');
    const location = useLocation();
    const { pathname } = location;
    const campaignID = pathname.split('/')[2];

    const token = localStorage.getItem('token');

    const CreateAgents = async (data) => {
        data.campaignId = campaignID;
        await axios
            .put('https://logic-theorist.com/amazon-connect/agents', data, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            })
            .then((result) => {
                window.location.href = `/call-centers/${campaignID}`;
            })
            .catch((error) => {
                setResults(error.response.data);
            });
    };

    return (
        <MainCard title="Create Agent">
            <JsonForms
                schema={schema}
                uischema={uiSchema}
                data={data}
                renderers={materialRenderers}
                onChange={({ data, _errors }) => setData(data)}
                onSubmit={({ data, _errors }) => CreateContactFlow(data)}
            />
            <Button onClick={() => CreateAgents(data)} color="primary" variant="contained">
                Create Agent
            </Button>
            <div>{result}</div>
        </MainCard>
    );
};

export default CreateAgents;
