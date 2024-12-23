import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { gridSpacing } from 'configs/store/constant';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BalanceIcon from '@mui/icons-material/Balance';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// project imports
import MainCard from 'ui/components/cards/MainCard';
import TotalIncomeCard from 'ui/components/cards/Skeleton/TotalIncomeCard';
import axios from 'axios';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({ isLoading, title, value, prev_val }) => {
    const theme = useTheme();
    const change = {
        positive: <ArrowUpwardIcon sx={{ color: '#FC100D' }} />,
        negative: <ArrowDownwardIcon sx={{ color: '#4BB543' }} />,
        balance: <BalanceIcon />
    };

    const change_icon = () => {
        if (value - prev_val > 0) {
            return change['positive'];
        } else if (value - prev_val < 0) {
            return change['negative'];
        } else if (value - prev_val == 0) {
            return change['balance'];
        } else {
            return <QuestionMarkIcon />;
        }
    };

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.primary[800],
                                            color: '#fff'
                                        }}
                                    >
                                        <Grid container direction="column" alignContent="center">
                                            <Grid item>
                                                {/* {value - prev_val > 0 ? (
                                                    <ArrowUpwardIcon sx={{ color: '#FC100D' }} />
                                                ) : (
                                                    <ArrowDownwardIcon sx={{ color: '#4BB543' }} />
                                                )} */}
                                                {change_icon()}
                                            </Grid>
                                            <Grid item>{/* <Typography variant="subtitle2">{value - prev_val}</Typography> */}</Grid>
                                        </Grid>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <>
                                            {value !== null ? (
                                                <Typography variant="h4" sx={{ color: '#fff' }}>
                                                    $ {value}
                                                </Typography>
                                            ) : (
                                                <CircularProgress color="inherit" />
                                            )}
                                        </>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                            {title}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalIncomeDarkCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeDarkCard;
