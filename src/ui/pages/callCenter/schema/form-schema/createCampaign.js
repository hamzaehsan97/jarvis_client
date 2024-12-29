export const schema = {
    type: 'object',
    properties: {
        campaignName: {
            type: 'string',
            minLength: 3,
            description: 'Please enter your name'
        },
        campaignType: {
            type: 'string',
            enum: ['Inbound', 'Outbound']
        },
        campaignStartDate: {
            type: 'string',
            format: 'date'
        },
        campaignEndDate: {
            type: 'string',
            format: 'date'
        },
        campaignStatus: {
            type: 'string',
            enum: ['Draft', 'Active', 'Inactive']
        },
        campaignRegion: {
            type: 'string',
            // AWS regions for AWS connect
            enum: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1', 'ap-northeast-1', 'Other']
        },
        campaignCountry: {
            type: 'string',
            enum: ['USA']
        },
        campaignZipCode: {
            type: 'number',
            maxLength: 5
        }
    },
    required: ['campaignName', 'campaignType']
};
