import MoveDownIcon from '@mui/icons-material/MoveDown';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CampaignIcon from '@mui/icons-material/Campaign';
import CallEndIcon from '@mui/icons-material/CallEnd';
import WebhookIcon from '@mui/icons-material/Webhook';
import AltRouteIcon from '@mui/icons-material/AltRoute';
// Approved block types with configurations
export const blocksList = [
    'MessageParticipant',
    'UpdateContactTargetQueue',
    'TransferContactToQueue',
    'InvokeLambdaFunction',
    'TransferToFlow',
    'DisconnectParticipant'
];

export const blockConfigsList = {
    MessageParticipant: {
        type: 'MessageParticipant',
        friendlyName: 'Play Audio',
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        Parameters: ['Text'],
        icon: <CampaignIcon />
    },
    TransferContactToQueue: {
        type: 'TransferContactToQueue',
        friendlyName: 'Transfer to Agent',
        Transitions: {
            errorTypes: ['QueueAtCapacity', 'NoMatchingError']
        },
        Parameters: [],
        icon: <SupportAgentIcon />
    },
    UpdateContactTargetQueue: {
        type: 'UpdateContactTargetQueue',
        friendlyName: 'Choose Agent Queue',
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        Parameters: ['QueueId'],
        icon: <MoveDownIcon />
    },
    DisconnectParticipant: {
        type: 'DisconnectParticipant',
        friendlyName: 'Disconnect Customer',
        Transitions: {},
        Parameters: [],
        icon: <CallEndIcon />
    },
    InvokeLambdaFunction: {
        type: 'InvokeLambdaFunction',
        friendlyName: 'Lambda Function',
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        Parameters: ['LambdaFunctionARN', 'InvocationTimeLimitSeconds', 'ResponseValidation'],
        icon: <WebhookIcon />
    },
    TransferToFlow: {
        type: 'TransferToFlow',
        friendlyName: 'Transfer to Workflow',
        Parameters: ['ContactFlowId'],
        Transitions: {
            errorTypes: ['NoMatchingError']
        },
        icon: <AltRouteIcon />
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
