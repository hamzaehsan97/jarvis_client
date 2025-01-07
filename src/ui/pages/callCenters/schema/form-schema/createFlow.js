export const schema = {
    type: 'object',
    properties: {
        contactFlowName: {
            type: 'string',
            minLength: 3,
            description: 'Please Enter the Contact Flow Name'
        },
        contactFlowType: {
            type: 'string',
            enum: [
                'CONTACT_FLOW',
                'CUSTOMER_QUEUE',
                'CUSTOMER_HOLD',
                'CUSTOMER_WHISPER',
                'OUTBOUND_WHISPER',
                'CUSTOMER_TRANSFER',
                'QUEUE_TRANSFER',
                'AGENT_HOLD',
                'AGENT_WHISPER',
                'AGENT_TRANSFER'
            ]
        },
        contactFlowContent: {
            type: 'string',
            description: 'Enter Valid Contact Flow Content'
        },
        flowDescription: {
            type: 'string',
            description: 'Describe the purpose of the flow'
        }
    },
    required: ['contactFlowName', 'contactFlowType', 'contactFlowContent']
};
