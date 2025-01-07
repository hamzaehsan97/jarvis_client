// assets
import { IconLayoutGrid } from '@tabler/icons';

// constant
const icons = { IconLayoutGrid };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconLayoutGrid,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
