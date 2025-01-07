/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project imports
import Loadable from '../ui/components/Loadable';

const NotFound = Loadable(lazy(() => import('../ui/components/error/NotFound')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const NotFoundRoutes = {
    path: '*',
    element: <NotFound />
};

export default NotFoundRoutes;
