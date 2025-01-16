import React, { useEffect, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { schema } from '../schema/form-schema/createFlow'; // Import your schema
import { uiSchema } from '../schema/ui-schema/createFlow'; // Import your UI schema
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SubCard from '../../../components/cards/SubCard';
import { IconLoader } from '@tabler/icons';
import { blocks, returnBlockConfigs, returnBlockTransitions, returnBlockParameters } from '../../../../configs/utilConfigs/blockConfigs';
import { Typography } from '@mui/material';
import NavigationScroll from '../../../layout/NavigationScroll';
import { createContactFlow, addBlock } from '../../../../utils/flowBuilderUtil';
import { width } from '@mui/system';
import MainCard from '../../../components/cards/MainCard';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400
};

const returnBlockIcon = () => {
    return <SupportAgentIcon />;
};

const BlockBuilder = () => {
    const blocksList = blocks;
    const location = useLocation();
    const { pathname } = location;
    const campaignID = pathname.split('/')[2];
    const [flow, setFlow] = useState(null);
    const [openModal, setOpenModel] = useState(false);
    const token = localStorage.getItem('token');
    const [blockModal, setBlockModal] = useState(null);
    const [blockForm, setBlockForm] = useState(null);
    const [formData, setFormData] = useState({});

    const handleClose = () => {
        setFormData({});
        setOpenModel(false);
        console.log(flow);
    };

    function handleOpen(block) {
        setBlockModal(block);
        if (block.type) {
            setOpenModel(true);
        }
    }

    function parseFormData(block) {
        var formObject = {
            Identifier: block.type,
            Type: block.type,
            Parameters: {},
            Transitions: {
                NextAction: 'Disconnect'
            }
        };
        const Errors = [];
        const blockTransitions = returnBlockTransitions(block.type);
        if (blockTransitions.length > 0) {
            for (const transition of blockTransitions) {
                const singleTransition = transition;
                var transitionEntry = {
                    ErrorType: transition,
                    NextAction: formData.transitions[singleTransition]
                };
                Errors.push(transitionEntry);
            }
        }
        formObject.Transitions.Errors = Errors;
        const blockParameters = returnBlockParameters(block.type);
        if (blockParameters.length > 0) {
            formObject.Parameters = formData.parameters;
        }
        console.log(formObject);
        addBlock(flow, formObject);
        handleClose();
    }

    function createBlockForm(block) {
        if (!block.type) return <></>;

        // Retrieve transitions and parameters for the block
        const blockTransitions = returnBlockTransitions(block.type);
        const blockParameters = returnBlockParameters(block.type);

        // Extract action identifiers from the flow
        const actionIdentifiers = flow.Actions.map((action) => action.Identifier);

        // Initialize dynamic schema and UI schema
        const dynamicSchema = {
            type: 'object',
            properties: {},
            required: []
        };

        const dynamicUiSchema = {
            type: 'VerticalLayout',
            elements: []
        };

        // Add parameters to the schema and UI schema if they are not empty
        if (blockParameters.length > 0) {
            dynamicSchema.properties.parameters = {
                type: 'object',
                properties: blockParameters.reduce((acc, param) => {
                    acc[param] = { type: 'string' }; // Each parameter is a text field
                    return acc;
                }, {})
            };

            dynamicUiSchema.elements.push({
                type: 'Group',
                label: 'Block Parameters',
                elements: blockParameters.map((param) => ({
                    type: 'Control',
                    scope: `#/properties/parameters/properties/${param}`
                }))
            });

            dynamicSchema.required.push('parameters');
        }

        // Add transitions to the schema and UI schema if they are not empty
        if (blockTransitions.length > 0) {
            dynamicSchema.properties.transitions = {
                type: 'object',
                properties: blockTransitions.reduce((acc, transition) => {
                    acc[transition] = {
                        type: 'string',
                        enum: actionIdentifiers // Dropdown choices populated with action identifiers
                    };
                    return acc;
                }, {})
            };

            dynamicUiSchema.elements.push({
                type: 'Group',
                label: 'Error Routes',
                elements: blockTransitions.map((transition) => ({
                    type: 'Control',
                    scope: `#/properties/transitions/properties/${transition}`,
                    options: {
                        showEnum: true // Optional to ensure dropdowns are rendered
                    }
                }))
            });

            dynamicSchema.required.push('transitions');
        }

        // If both parameters and transitions are empty, return an empty fragment
        if (dynamicUiSchema.elements.length === 0) {
            return <></>;
        }

        // Return the JsonForms component
        return (
            <div>
                <JsonForms
                    schema={dynamicSchema}
                    uischema={dynamicUiSchema}
                    data={formData}
                    renderers={materialRenderers}
                    onChange={({ data }) => setFormData(data)}
                />
                <Button variant="contained" color="primary" onClick={() => parseFormData(block)}>
                    Submit
                </Button>
            </div>
        );
    }

    // {
    //     "contactFlowName": "Sample Call",
    //     "contactFlowType": "CONTACT_FLOW",
    //     "contactFlowContent": "{\"Version\":\"2019-10-30\",\"StartAction\":\"1cf78dbd-febf-4604-8351-59740aea1b07\",\"Metadata\":{\"entryPointPosition\":{\"x\":40,\"y\":40},\"ActionMetadata\":{\"1cf78dghbbd-febf-4604-8351-59740aea1b07\":{\"position\":{\"x\":171.2,\"y\":52.8}}},\"Annotations\":[],\"name\":\"test\",\"description\":\"\",\"type\":\"contactFlow\",\"status\":\"published\",\"hash\":{}},\"Actions\":[{\"Parameters\":{},\"Identifier\":\"1cf78dbd-febf-4604-8351-59740aea1b07\",\"Type\":\"DisconnectParticipant\",\"Transitions\":{}}]}",
    //     "flowDescription": "This is a sample call flow",
    //     "campaignID": "cc71f768-8c00-4405-b0ec-1477cb370"
    // }

    const CreateContactFlow = async () => {
        var data = {
            contactFlowName: 'Sample Call1443',
            contactFlowType: 'CONTACT_FLOW',
            contactFlowContent: JSON.stringify(flow),
            flowDescription: 'This is a sample call flow',
            campaignID: campaignID
        };
        // data.campaignID = campaignID;
        // data.contactFlowContent = JSON.parse(data.contactFlowContent);
        await axios
            .put('https://logic-theorist.com/amazon-connect/connect/flows', data, {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            })
            .then((result) => {
                window.location.href = `/call-centers/${campaignID}`;
            })
            .catch((error) => {
                // setResults(error.response.data);
                console.log('ERROR', error);
            });
    };

    useEffect(() => {
        var emptyFlow = createContactFlow('Flow Name', 'Flow description');
        setFlow(emptyFlow);
    }, []);

    const BlockComponent = ({ block }) => (
        <SubCard
            style={{
                border: '1px solid #ccc',
                margin: '5px 0',
                // padding: '5px',
                position: 'relative',
                zIndex: 1,
                transition: 'box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(144, 202, 249, 0.2), 0 8px 30px rgba(0, 0, 255, 0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
        >
            <Grid
                container
                direction={'row'}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Grid item xs={2}>
                    {returnBlockIcon(block.friendlyName ? block.friendlyName : block.Type)}
                </Grid>
                <Grid item xs={8}>
                    <Typography>{block.friendlyName ? block.friendlyName : block.Type}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(block)} color="black" sx={{ mr: 1 }}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </SubCard>
    );

    const BlockDesignerComponent = ({ block }) => (
        <MainCard
            style={{
                border: '1px solid #ccc',
                margin: '5px 5px',
                // padding: '5px',
                position: 'relative',
                zIndex: 1,
                width: 100 + '%',
                transition: 'box-shadow 0.3s ease'
            }}
            // onClick={handleOpen()}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(144, 202, 249, 0.2), 0 8px 30px rgba(0, 0, 255, 0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
        >
            <Grid
                container
                direction={'row'}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Grid item xs={10}>
                    <Typography>{block.friendlyName ? block.friendlyName : block.Type}</Typography>
                </Grid>
            </Grid>
        </MainCard>
    );

    return (
        <Grid container direction={'row'} spacing={1}>
            <Grid item md={9} xl={10}>
                <SubCard
                    title="Designer"
                    titleChildren={
                        <Button variant="outlined" onClick={async () => CreateContactFlow()}>
                            Create Workflow
                        </Button>
                    }
                >
                    <>
                        {flow && flow.Actions && (
                            <Grid container direction={'row'} spacing={1}>
                                <Grid item xs={3}>
                                    <BlockDesignerComponent key={'startBlock'} block={{ Type: 'Start Block' }} />
                                </Grid>
                                {flow.Actions.map((block) => (
                                    <Grid item xs={3}>
                                        <BlockDesignerComponent key={block.Identifier} block={block} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                </SubCard>
            </Grid>
            <Grid item md={3} xl={2}>
                <SubCard title="Blocks List">
                    {blocksList ? (
                        <>
                            {blocksList
                                .filter((block) => block.type !== 'DisconnectParticipant') // Exclude blocks with type DisconnectParticipant
                                .map((block) => (
                                    <NavigationScroll key={block.type}>
                                        <BlockComponent block={block} />
                                    </NavigationScroll>
                                ))}
                        </>
                    ) : (
                        <IconLoader />
                    )}
                </SubCard>
            </Grid>
            {blockModal && (
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <SubCard title={blockModal.friendlyName} darkTitle={true}>
                            {createBlockForm(blockModal)}
                        </SubCard>
                    </Box>
                </Modal>
            )}
        </Grid>
    );
};

export default BlockBuilder;
