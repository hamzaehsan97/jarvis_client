// Approved block types with configurations
export const blocksList = [
    'TransferContactToQueue',
    'UpdateContactTargetQueue',
    'MessageParticipant',
    'DisconnectParticipant',
    'InvokeLambdaFunction',
    'TransferToFlow'
];

export const blockConfigsList = {
    TransferContactToQueue: {
        type: 'TransferContactToQueue',
        friendlyName: 'Transfer to Agent',
        Transitions: {
            errorTypes: ['QueueAtCapacity', 'NoMatchingError']
        },
        Parameters: []
    },
    UpdateContactTargetQueue: {
        type: 'UpdateContactTargetQueue',
        friendlyName: 'Choose Agent Queue',
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        Parameters: ['QueueId']
    },
    MessageParticipant: {
        type: 'MessageParticipant',
        friendlyName: 'Play Audio',
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        Parameters: ['Text']
    },
    DisconnectParticipant: {
        type: 'DisconnectParticipant',
        friendlyName: 'Disconnect Customer',
        Transitions: {},
        Parameters: []
    },
    InvokeLambdaFunction: {
        type: 'InvokeLambdaFunction',
        friendlyName: 'Lambda Function',
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        Parameters: ['LambdaFunctionARN', 'InvocationTimeLimitSeconds', 'ResponseValidation']
    },
    TransferToFlow: {
        type: 'TransferToFlow',
        friendlyName: 'Transfer to Workflow',
        Parameters: ['ContactFlowId'],
        Transitions: {
            errorTypes: ['NoMatchingError']
        }
    }
};

export const blocks = [
    {
        type: 'TransferContactToQueue',
        friendlyName: 'Transfer to Agent',
        Transitions: {
            errorTypes: ['QueueAtCapacity', 'NoMatchingError']
        },
        Parameters: []
    },
    {
        type: 'UpdateContactTargetQueue',
        friendlyName: 'Choose Agent Queue',
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        Parameters: ['QueueId']
    },
    {
        type: 'MessageParticipant',
        friendlyName: 'Play Audio',
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        Parameters: ['Text']
    },
    {
        type: 'DisconnectParticipant',
        friendlyName: 'Disconnect Customer',
        Transitions: {},
        Parameters: []
    },
    {
        type: 'InvokeLambdaFunction',
        friendlyName: 'Lambda Function',
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        Parameters: ['LambdaFunctionARN', 'InvocationTimeLimitSeconds', 'ResponseValidation']
    },
    {
        type: 'TransferToFlow',
        friendlyName: 'Transfer to Workflow',
        Parameters: ['ContactFlowId'],
        Transitions: {
            errorTypes: ['NoMatchingError']
        }
    }
];
