import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const PasswordReset = Loadable(lazy(() => import('views/pages/authentication/authentication3/PasswordReset')));
const PrivacyPolicy = Loadable(lazy(() => import('views/pages/PrivacyPolicy')));
const TermsOfService = Loadable(lazy(() => import('views/pages/TermsOfService')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin3 />
        },
        {
            path: '/register',
            element: <AuthRegister3 />
        },
        {
            path: '/password-reset',
            element: <PasswordReset />
        },
        {
            path: '/privacy-policy',
            element: <PrivacyPolicy />
        },
        {
            path: '/terms-of-service',
            element: <TermsOfService />
        }
    ]
};

export default AuthenticationRoutes;
