export const uiSchema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'HorizontalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/contactFlowName',
                    label: 'Contact Flow Name',
                    options: {
                        className: 'form-control-margin'
                    }
                },
                {
                    type: 'Control',
                    scope: '#/properties/contactFlowType',
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
                    scope: '#/properties/contactFlowContent',
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
                    scope: '#/properties/flowDescription',
                    options: {
                        className: 'form-control-margin'
                    }
                }
            ]
        }
    ]
};
