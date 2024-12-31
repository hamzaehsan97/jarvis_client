/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project imports
import MainLayout from '../ui/layout/MainLayout';
import Loadable from '../ui/components/Loadable';

const Dashboard = Loadable(lazy(() => import('../ui/pages/dashboard')));
const Notes = Loadable(lazy(() => import('../ui/pages/notes')));
const Passwords = Loadable(lazy(() => import('../ui/pages/passwords')));
const Settings = Loadable(lazy(() => import('../ui/pages/settings')));
const CallCenters = Loadable(lazy(() => import('../ui/pages/callCenters')));
const CallCenter = Loadable(lazy(() => import('../ui/pages/callCenters/callCenter')));
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
            element: <Dashboard />
        },
        {
            path: 'notes',
            element: <Notes />
        },
        {
            path: 'call-centers',
            element: <CallCenters />
        },
        {
            path: 'call-centers/:id',
            element: <CallCenter />
        },
        {
            path: 'passwords',
            element: <Passwords />
        },
        { path: 'settings', element: <Settings /> }
    ]
};

export default MainRoutes;
