import { useSelector } from 'react-redux';
import axios from 'axios';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UserContext from 'UserContext';
import { Password } from '@mui/icons-material';
import { useEffect, useState, useContext } from 'react';

const BankAccountsList = () => {
    const [accounts, setAccounts] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            token: token
        }
    };
    useEffect(() => {
        async function fetchData() {
            axios
                .get('https://jarvis-backend-test.herokuapp.com/finance/accounts', config)
                .then((result) => {
                    // console.log(result);
                    if (loading == true) {
                        console.log(result.data.data);
                        setAccounts(result.data.data);
                        setMessage(result.data.message);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    // openSnackBar({ children: error.response.data.message, severity: 'error' });
                });
        }
        fetchData();
    }, [accounts]);
    const deleteAccount = () => {
        axios
            .get('https://jarvis-backend-test.herokuapp.com/finance/accounts', config)
            .then((result) => {
                // console.log(result);
                if (loading == true) {
                    console.log(result.data.data);
                    setAccounts(result.data.data);
                    setMessage(result.data.message);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                // openSnackBar({ children: error.response.data.message, severity: 'error' });
            });
    };
    return (
        <>
            <Typography style={{ color: 'red', opacity: 70 + '%' }} variant="subtitle2">
                {message}
            </Typography>
            {accounts == null || accounts.length == 0 ? (
                <></>
            ) : (
                <Grid container direction="column" spacing={gridSpacing - 2} style={{ width: 50 + '%' }}>
                    <Grid item>
                        <Typography style={{ paddingTop: 20 }} variant="h5">
                            Bank Accounts
                        </Typography>
                        <br />
                    </Grid>
                    {accounts.map((account) => (
                        <Grid item key={account._id}>
                            <Grid container direction="row" spacing={gridSpacing}>
                                <Grid item xs={12} md={9} lg={9}>
                                    {' '}
                                    {account.item}
                                </Grid>
                                <Grid item xs={6} md={2} lg={2}>
                                    {' '}
                                    {account.creationTime.date}
                                </Grid>
                                <Grid item xs={6} md={1} lg={1}>
                                    <DeleteIcon color="error" onClick={deleteAccount(account._id)} />
                                </Grid>
                            </Grid>
                            <hr />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default BankAccountsList;
