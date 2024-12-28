/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project imports
import MainLayout from '../ui/layout/MainLayout';
import Loadable from '../ui/components/Loadable';

const Notes = Loadable(lazy(() => import('../ui/pages/notes')));
const Passwords = Loadable(lazy(() => import('../ui/pages/passwords')));
const Settings = Loadable(lazy(() => import('../ui/pages/settings')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Notes />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <Notes />
                }
            ]
        },
        {
            path: 'notes',
            element: <Notes />
        },
        {
            path: 'passwords',
            element: <Passwords />
        },
        { path: 'settings', element: <Settings /> }
    ]
};

export default MainRoutes;
