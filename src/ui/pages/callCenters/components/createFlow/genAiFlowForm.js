import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { schema } from '../../schema/form-schema/createFlow'; // Import your schema
import { uiSchema } from '../../schema/ui-schema/createFlow'; // Import your UI schema
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SubCard from '../../../../components/cards/SubCard';
const GenAiFlowForm = () => {
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

    const CreateContactFlow = async (data) => {
        data.campaignID = campaignID;
        data.contactFlowContent = JSON.parse(data.contactFlowContent);
        await axios
            .put('https://logic-theorist.com/amazon-connect/connect/flows', data, {
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
        <SubCard title={'Gen AI WorkFlow Creation'}>
            <p>Gen AI WorkFlow Creation</p>
        </SubCard>
    );
};

export default GenAiFlowForm;
