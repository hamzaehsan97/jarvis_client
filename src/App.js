import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import UserContext from 'UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user_name, setUser_Name] = useState(localStorage.getItem('user_name'));
    const [secretKey, setSecretKey] = useState(localStorage.getItem('secretKey'));
    const [userObject, setUserObject] = useState(localStorage.getItem('userObject'));
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const errorHandle = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const validateAuth = (user, token) => {
        if (token !== undefined && token !== null && token !== 'null') {
            console.log('✅ variable is NOT undefined or null', token);
            console.log('decode', jwt(token));
            console.log('user', user);
            console.log('token', token);
            const decode_token = jwt(token);
            let dateString = String(Date.now()).substring(0, 10);
            let dateNum = Number(dateString);
            console.log('decode time', decode_token.exp);
            console.log('curr_time', dateNum);
            if (decode_token.exp < dateNum) {
                return false;
            } else {
                setUser(decode_token.email);
                setUser_Name(decode_token.first_name);
                setSecretKey(decode_token.secret);
                setUserObject(decode_token);
                return true;
            }
        }
        console.log('user', user);
        console.log('token', token);
        return false;
    };

    useEffect(() => {
        console.log('path', location.pathname);
        // setUser(localStorage.getItem('user'));
        // setToken(localStorage.getItem('token'));
        if (validateAuth(user, token) && location.pathname === '/pages/login/login3') {
            // console.log('path', Router.pathname());
            console.log('changing route');
            console.log('user', user);
            console.log('token', token);
            console.log('auth is valid');
            navigate('/');
        } else if (!validateAuth(user, token) && location.pathname !== '/pages/login/login3') {
            console.log('changing route');
            console.log('user', user);
            console.log('toke', token);
            console.log('auth is not valid');
            navigate('/pages/login/login3');
            // navigate('/pages/login/login3');
        }
    }, [user, token]);

    return (
        <StyledEngineProvider injectFirst>
            <UserContext.Provider
                value={{
                    user: user,
                    token: token,
                    setUser: setUser,
                    setToken: setToken,
                    user_name: user_name,
                    secretKey: secretKey,
                    userObject: userObject,
                    openSnackBar: setSnackbar
                }}
            >
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
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
                    </NavigationScroll>
                </ThemeProvider>
            </UserContext.Provider>
        </StyledEngineProvider>
    );
};

export default App;
