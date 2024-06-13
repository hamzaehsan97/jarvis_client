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
    const nonAuthRoutes = ['/login', '/register', '/password-reset', '/privacy-policy', '/terms-of-service'];
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
            const decode_token = jwt(token);
            let dateString = String(Date.now()).substring(0, 10);
            let dateNum = Number(dateString);
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
        return false;
    };

    useEffect(() => {
        if (validateAuth(user, token) && location.pathname === '/login') {
            navigate('/');
        } else if (!validateAuth(user, token) && !nonAuthRoutes.includes(location.pathname)) {
            navigate('/login');
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
