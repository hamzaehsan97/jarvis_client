import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { schema } from '../schema/form-schema/createCampaign'; // Import your schema
import { uiSchema } from '../schema/ui-schema/createCampaign'; // Import your UI schema
import Button from '@mui/material/Button';

const CreateCampaignForm = () => {
    const initialData = {
        name: 'John Doe',
        vegetarian: false,
        birthDate: '1985-06-02',
        personalData: {
            age: 34
        },
        postalCode: '12345'
    };
    const [data, setData] = useState(initialData);

    const handleChange = (newData) => {
        setData(newData);
    };

    return (
        <div>
            <JsonForms
                schema={schema}
                uischema={uiSchema}
                data={data}
                renderers={materialRenderers}
                // cells={materialCells}
                onChange={({ data, _errors }) => setData(data)}
            />
            <Button onClick={() => setData({})} color="primary">
                Clear form data
            </Button>
        </div>
    );
};

export default CreateCampaignForm;
