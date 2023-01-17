import React, { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import UserContext from 'UserContext';
import axios from 'axios';
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Finance(props) {
    const site_token = localStorage.getItem('token');
    const backend_config = {
        headers: {
            token: site_token
        }
    };
    const [token, setToken] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const onSuccess = useCallback(async (publicToken) => {
        setLoading(true);
        async function fetchData() {
            axios
                .post(
                    'https://jarvis-backend-test.herokuapp.com/finance/plaid/set_access_token?public_token=' + publicToken,
                    {},
                    backend_config
                )
                .then((result) => {
                    setLoading(false);
                    console.log('Set Public Token = ', result);
                    setSnackbar({ children: result.data.message, severity: 'success' });
                })
                .catch((error) => {
                    console.log('THIS IS THE ERROR', error);
                    setSnackbar({ children: result.data.message, severity: 'error' });
                });
        }
        fetchData();
        // await getBalance();
    }, []);

    // Creates a Link token
    const createLinkToken = React.useCallback(async () => {
        // For OAuth, use previously generated Link token
        if (window.location.href.includes('?oauth_state_id=')) {
            const linkToken = localStorage.getItem('link_token');
            setToken(linkToken);
        } else {
            async function fetchData() {
                axios
                    .get('https://jarvis-backend-test.herokuapp.com/finance/plaid/create_link_token', backend_config)
                    .then((result) => {
                        console.log('Result', result);
                        setToken(result.data.link_token);
                        localStorage.setItem('link_token', result.data.link_token);
                    })
                    .catch((error) => {
                        console.log('error', error);
                        console.log(error);
                    });
            }
            fetchData();
        }
    }, [token]);

    // Fetch balance data
    const getBalance = React.useCallback(async () => {
        setLoading(true);
        const response = await fetch('/api/balance', {});
        const data = await response.json();
        setData(data);
        setLoading(false);
    }, [setData, setLoading]);

    let isOauth = false;

    const config = {
        token,
        onSuccess
    };

    // For OAuth, configure the received redirect URI
    if (window.location.href.includes('?oauth_state_id=')) {
        // console.log('This is the config', config);
        config.receivedRedirectUri = window.location.href;
        isOauth = true;
    }
    const { open, ready } = usePlaidLink(config);

    useEffect(() => {
        console.log('this is token', token);
        if (token == null) {
            // console.log('setting token');
            createLinkToken();
        } else {
            console.log('THE TOKEN', token);
        }
        if (isOauth && ready) {
            console.log('OPEN', open);
            open();
        }
    }, [token, isOauth, ready, open]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const errorHandle = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    return (
        <MainCard title="Finance">
            <Button variant="contained" onClick={() => open()} disabled={!ready}>
                <strong>Link account</strong>
            </Button>

            {!loading &&
                data != null &&
                Object.entries(data).map((entry, i) => (
                    <pre key={i}>
                        <code>{JSON.stringify(entry[1], null, 2)}</code>
                    </pre>
                ))}
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </MainCard>
    );
}

export default Finance;
