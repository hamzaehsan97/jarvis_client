import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import { useCallCenterContext } from '../../../../configs/context/callCenterContext';

const AttachPhoneNumberForm = (props) => {
    const [availablePhoneNumbers, setAvailablePhoneNumbers] = useState(null);
    const [refreshPhoneNumbers, setRefreshPhoneNumbers] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);
    // const { callCenterDetails } = useCallCenterContext();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAvailablePhoneNumbers = async () => {
            try {
                const response = await axios.get(`https://logic-theorist.com/amazon-connect/connect/phone-numbers?token=${token}`);
                setAvailablePhoneNumbers(response.data.AvailableNumbersList);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAvailablePhoneNumbers();
    }, [refreshPhoneNumbers, token]);

    function handleRadioChange(event) {
        setPhoneNumber(event.target.value);
    }

    function handleAttachPhoneNumber() {
        claimPhoneNumber();
    }

    function claimPhoneNumber() {
        const data = {
            phone_number: phoneNumber
        };
        axios
            .put(
                `https://logic-theorist.com/amazon-connect/connect/number?token=${token}&instanceID=82434149-1844-49cc-af6e-4f40b54df820`,
                data
            )
            .then((response) => {
                console.log(response);
                associatePhoneNumber(response.data.PhoneNumberId);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function associatePhoneNumber(phoneNumberId) {
        const associateData = {
            phone_number_id: String(phoneNumberId),
            contact_flow_id: props.flowID,
            phone_number: phoneNumber
        };
        console.log('associateData', associateData);
        axios
            .patch(
                `https://logic-theorist.com/amazon-connect/connect/number?token=${token}&instanceID=82434149-1844-49cc-af6e-4f40b54df820`,
                associateData
            )
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <p>
                    Attach a Phone Number to <b>{props.flowName}</b>
                </p>
            </Grid>
            <Grid item>
                <Grid container direction="row" spacing={1} justifyContent="space-between">
                    <Grid item>
                        {availablePhoneNumbers ? (
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Available Phone Number</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    onChange={handleRadioChange}
                                >
                                    {availablePhoneNumbers &&
                                        availablePhoneNumbers.map((phoneNumber) => (
                                            <FormControlLabel
                                                key={phoneNumber.PhoneNumber}
                                                value={phoneNumber.PhoneNumber}
                                                control={<Radio />}
                                                label={phoneNumber.PhoneNumber}
                                            />
                                        ))}
                                </RadioGroup>
                            </FormControl>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </Grid>
                    <Grid item>
                        <Button onClick={() => setRefreshPhoneNumbers(!refreshPhoneNumbers)} color="secondary" variant="outlined">
                            Refresh Phone Numbers
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="row" spacing={1} justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={() => handleAttachPhoneNumber()} disabled={!phoneNumber} color="primary" variant="contained">
                            Add Phone Number
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AttachPhoneNumberForm;
