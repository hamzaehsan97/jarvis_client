import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const HoursOfOperation = (props) => {
    const [days, setDays] = useState([]);
    const [hoursOfOperation, setHoursOfOperation] = useState(null);
    const [hours, setHours] = useState({
        Monday: [12, 12],
        Tuesday: [12, 12],
        Wednesday: [12, 12],
        Thursday: [12, 12],
        Friday: [12, 12],
        Saturday: [12, 12],
        Sunday: [12, 12]
    });
    const [editMode, setEditMode] = useState(false);
    const token = localStorage.getItem('token');

    const weekdaysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleChange = (day) => (event, newValue) => {
        setHours((prev) => ({
            ...prev,
            [day]: newValue
        }));
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    const format12HourTime = (hour) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour clock
        return `${formattedHour} ${period}`;
    };

    const valueLabelFormat = (value) => {
        return format12HourTime(value);
    };

    useEffect(() => {
        const fetchHoursOfOperations = async () => {
            const data = {
                instanceID: props.instanceID,
                hoursOfOperationId: props.hoursOfOperationId
            };

            try {
                const response = await axios.get(
                    `https://logic-theorist.com/amazon-connect/connect/hours-of-operation?token=${token}&instanceID=${data.instanceID}&hoursOfOperationId=${data.hoursOfOperationId}`
                );
                setHoursOfOperation(response.data.HoursOfOperation);
            } catch (err) {
                console.error(err);
            }
        };

        fetchHoursOfOperations();
    }, [token]);

    useEffect(() => {
        if (hoursOfOperation) {
            const newDays = [];
            const newHours = {};

            for (const config of hoursOfOperation.Config) {
                const { Day, StartTime, EndTime } = config;
                newDays.push(Day);
                newHours[Day] = [Number(StartTime.Hours), Number(EndTime.Hours)];
            }

            // Sort days in weekday order
            const sortedDays = newDays.sort((a, b) => weekdaysOrder.indexOf(a) - weekdaysOrder.indexOf(b));

            setDays(sortedDays);
            setHours((prev) => ({ ...prev, ...newHours }));
        }
    }, [hoursOfOperation]);

    return (
        <Box>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Typography variant="h5">{hoursOfOperation && hoursOfOperation.TimeZone}</Typography>
                        <IconButton onClick={toggleEditMode} aria-label="Toggle Edit Mode">
                            <EditIcon color={editMode ? 'primary' : 'inherit'} />
                        </IconButton>
                    </Grid>
                </Grid>
                {days.map((day) => (
                    <Grid item key={day}>
                        <Typography variant="h6" gutterBottom>
                            {day}
                        </Typography>
                        <Slider
                            getAriaLabel={() => `${day} hours`}
                            value={hours[day]}
                            onChange={handleChange(day)}
                            valueLabelDisplay="auto"
                            valueLabelFormat={valueLabelFormat}
                            step={1}
                            min={0}
                            max={24}
                            disabled={!editMode}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HoursOfOperation;
