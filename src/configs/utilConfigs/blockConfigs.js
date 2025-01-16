// Approved block types with configurations
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
    }
];

export const returnBlockConfigs = (blockName) => {
    const blockConfigs = {
        TransferContactToQueue: {
            friendlyName: 'Transfer to Agent'
        },
        UpdateContactTargetQueue: {
            friendlyName: 'Choose Agent Queue'
        },
        MessageParticipant: {
            friendlyName: 'Play Audio'
        },
        DisconnectParticipant: {
            friendlyName: 'Disconnect Customer'
        }
    };

    return blockConfigs[blockName].friendlyName;
};

export const returnBlockTransitions = (blockName) => {
    const blockConfigs = {
        TransferContactToQueue: {
            transitions: ['QueueAtCapacity', 'NoMatchingError']
        },
        UpdateContactTargetQueue: {
            transitions: ['NoMatchingError']
        },
        MessageParticipant: {
            transitions: ['NoMatchingError']
        },
        DisconnectParticipant: {
            transitions: []
        }
    };

    return blockConfigs[blockName].transitions;
};

export const returnBlockParameters = (blockName) => {
    const blockConfigs = {
        TransferContactToQueue: {
            Parameters: []
        },
        UpdateContactTargetQueue: {
            Parameters: ['QueueId']
        },
        MessageParticipant: {
            Parameters: ['Text']
        },
        DisconnectParticipant: {
            Parameters: []
        }
    };

    return blockConfigs[blockName].Parameters;
};
