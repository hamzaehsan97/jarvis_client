export const uiSchema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'HorizontalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/campaignName',
                    options: {
                        className: 'form-control-margin'
                    }
                },
                {
                    type: 'Control',
                    scope: '#/properties/campaignType',
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
                    scope: '#/properties/campaignStartDate',
                    options: {
                        className: 'form-control-margin'
                    }
                },
                {
                    type: 'Control',
                    scope: '#/properties/campaignEndDate',
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
                    scope: '#/properties/campaignStatus',
                    options: {
                        className: 'form-control-margin'
                    }
                },
                {
                    type: 'Control',
                    scope: '#/properties/campaignRegion',
                    options: {
                        suggestion: ['Accountant', 'Engineer', 'Freelancer', 'Journalism', 'Physician', 'Student', 'Teacher', 'Other'],
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
                    scope: '#/properties/campaignCountry',
                    options: {
                        suggestion: ['Accountant', 'Engineer', 'Freelancer', 'Journalism', 'Physician', 'Student', 'Teacher', 'Other'],
                        className: 'form-control-margin'
                    }
                },
                {
                    type: 'Control',
                    scope: '#/properties/campaignZipCode',
                    options: {
                        className: 'form-control-margin'
                    }
                }
            ]
        }
    ]
};
