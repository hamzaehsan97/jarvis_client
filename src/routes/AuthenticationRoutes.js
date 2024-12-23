import { lazy } from 'react';

// project imports
import Loadable from 'ui/components/Loadable';
import MinimalLayout from 'ui/layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('ui/pages/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('ui/pages/pages/authentication/authentication3/Register3')));
const PasswordReset = Loadable(lazy(() => import('ui/pages/pages/authentication/authentication3/PasswordReset')));
const PrivacyPolicy = Loadable(lazy(() => import('ui/pages/pages/PrivacyPolicy')));
const TermsOfService = Loadable(lazy(() => import('ui/pages/pages/TermsOfService')));
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
