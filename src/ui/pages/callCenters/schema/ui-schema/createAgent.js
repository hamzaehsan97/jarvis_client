export const uiSchema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'HorizontalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/agentFirstName',
                    label: `Agent's First Name`,
                    options: {
                        className: 'form-control-margin'
                    }
                },
                {
                    type: 'Control',
                    scope: '#/properties/agentLastName',
                    options: {
                        className: 'form-control-margin'
                    }
                }
            ]
        },
        {
            type: 'HorizontalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/agentEmail',
                    options: {
                        className: 'form-control-margin'
                    }
                },
                {
                    type: 'Control',
                    scope: '#/properties/agentCountry',
                    options: {
                        className: 'form-control-margin'
                    }
                }
            ]
        },
        {
            type: 'HorizontalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/agentPhoneNumber',
                    options: {
                        className: 'form-control-margin'
                    }
                },
                {
                    type: 'Control',
                    scope: '#/properties/agentLanguages',
                    options: {
                        className: 'form-control-margin'
                    }
                }
            ]
        }
    ]
};
