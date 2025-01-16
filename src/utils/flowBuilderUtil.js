import { blocks } from '../configs/utilConfigs/blockConfigs';

export function createContactFlow(name, description) {
    const json = {
        Version: '2019-10-30',
        StartAction: 'Disconnect',
        Metadata: {
            entryPointPosition: { x: 38.4, y: 39.2 },
            ActionMetadata: {},
            Annotations: [],
            name: name || '',
            description: description || '',
            type: 'contactFlow',
            status: 'published',
            hash: {}
        },
        Actions: [
            {
                Identifier: 'Disconnect',
                Type: 'DisconnectParticipant',
                Parameters: {},
                Transitions: {}
            }
        ]
    };

    return json;
}

function generateUniqueIdentifier(existingIdentifiers, baseIdentifier) {
    let uniqueIdentifier = baseIdentifier;
    let counter = 1;
    while (existingIdentifiers.includes(uniqueIdentifier)) {
        uniqueIdentifier = `${baseIdentifier}_${counter}`;
        counter++;
    }
    return uniqueIdentifier;
}

function getNextPosition(json) {
    if (json.Actions.length >= 2) {
        const lastBlock = json.Actions[json.Actions.length - 1];
        const lastPosition = lastBlock.Position || { x: 0, y: 0 };
        return {
            x: lastPosition.x + 200,
            y: lastPosition.y + 200
        };
    } else {
        return {
            x: 250,
            y: 250
        };
    }
}

export function addBlock(json, block) {
    const blockTypeConfig = blocks.find((b) => b.type === block.Type);
    if (!blockTypeConfig) {
        throw new Error(`Block type '${block.Type}' is not approved.`);
    }

    const requiredParams = blockTypeConfig.Parameters;
    const providedParams = Object.keys(block.Parameters || {});
    requiredParams.forEach((param) => {
        if (!providedParams.includes(param)) {
            throw new Error(`Missing required parameter '${param}' for block type '${block.Type}'.`);
        }
    });

    const existingIdentifiers = json.Actions.map((action) => action.Identifier);
    block.Identifier = generateUniqueIdentifier(existingIdentifiers, block.Identifier);

    const position = getNextPosition(json);

    if (json.Actions.length >= 2) {
        const lastActionIndex = json.Actions.length - 2;
        if (lastActionIndex >= 0 && json.Actions[lastActionIndex].Type !== 'DisconnectParticipant') {
            json.Actions[lastActionIndex].Transitions.NextAction = block.Identifier;
        }
    }

    json.Metadata.ActionMetadata[block.Identifier] = {
        position: position,
        isFriendlyName: true
    };

    const disconnectIndex = json.Actions.findIndex((action) => action.Type === 'DisconnectParticipant');
    json.Actions.splice(disconnectIndex, 0, {
        Parameters: block.Parameters || {},
        Identifier: block.Identifier,
        Type: block.Type,
        Transitions: {
            NextAction: block.Transitions.NextAction || 'Disconnect',
            Errors: blockTypeConfig.Transitions.errorTypes.map((errorType) => ({
                NextAction: block.Transitions?.Errors?.find((e) => e.ErrorType === errorType)?.NextAction || '',
                ErrorType: errorType
            }))
        }
    });

    if (json.StartAction === 'Disconnect' && json.Actions.length > 1) {
        json.StartAction = json.Actions[0].Identifier;
    }

    return json;
}

export function deleteBlock(json, blockIdentifier) {
    const blockIndex = json.Actions.findIndex((action) => action.Identifier === blockIdentifier);

    if (blockIndex === -1) {
        throw new Error(`Block with identifier '${blockIdentifier}' not found.`);
    }

    // Update transitions of the previous block to skip the deleted block
    if (blockIndex > 0) {
        const previousBlock = json.Actions[blockIndex - 1];
        if (previousBlock.Transitions && previousBlock.Transitions.NextAction === blockIdentifier) {
            previousBlock.Transitions.NextAction = json.Actions[blockIndex].Transitions?.NextAction || 'Disconnect';
        }
    }

    // Remove block metadata
    delete json.Metadata.ActionMetadata[blockIdentifier];

    // Remove the block
    json.Actions.splice(blockIndex, 1);

    // Update StartAction if the deleted block was the start action
    if (json.StartAction === blockIdentifier) {
        json.StartAction = json.Actions[0]?.Identifier || 'Disconnect';
    }

    return json;
}

// Example usage
// let contactFlow = createContactFlow('Introduction Flow', '');

// contactFlow = addBlock(contactFlow, {
//     Identifier: 'Message1',
//     Type: 'MessageParticipant',e
//     Parameters: {
//         Text: 'Hello, customer!'
//     },
//     Transitions: {
//         NextAction: 'Disconnect',
//         Errors: [{ NextAction: 'Disconnect', ErrorType: 'NoMatchingError' }]
//     }
// });

// contactFlow = addBlock(contactFlow, {
//     Identifier: 'Message2',
//     Type: 'MessageParticipant',
//     Parameters: {
//         Text: 'How can I assist you?'
//     },
//     Transitions: {
//         NextAction: 'Disconnect',
//         Errors: [{ NextAction: 'Disconnect', ErrorType: 'NoMatchingError' }]
//     }
// });
