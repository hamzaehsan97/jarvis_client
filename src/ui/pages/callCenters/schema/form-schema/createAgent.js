export const schema = {
    type: 'object',
    properties: {
        agentFirstName: {
            type: 'string',
            minLength: 3,
            description: `Please enter agent's first name`
        },
        agentLastName: {
            type: 'string',
            minLength: 3,
            description: `Please enter agent's last name`
        },
        agentEmail: {
            type: 'string',
            minLength: 3,
            description: `Please enter agent's email address`
        },
        agentPhoneNumber: {
            type: 'string',
            description: `Please enter agent's phone number`
        },
        agentCountry: {
            type: 'string',
            enum: ['USA', 'Canada', 'China', 'France', 'Vietnam', 'Pakistan', 'Spain'],
            description: `Choose agent's country`
        },
        agentLanguages: {
            type: 'string',
            enum: ['English', 'Spanish', 'Vietnamese', 'Chinese', 'Urdu', 'Arabic', 'French'],
            description: `Choose agent's support language`
        }
    },
    required: ['agentFirstName', 'agentLastName', 'agentEmail', 'agentPhoneNumber', 'agentCountry', 'agentLanguages']
};
