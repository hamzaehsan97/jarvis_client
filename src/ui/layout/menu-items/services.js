// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const services = {
    id: 'services',
    title: 'Services',
    caption: 'Tools',
    type: 'group',
    children: [
        {
            id: 'call-center',
            title: 'Call Center',
            type: 'item',
            url: '/call-center',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'notes',
            title: 'Notes',
            type: 'item',
            url: '/notes',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        { id: 'passwords', title: 'Passwords', type: 'item', url: '/passwords', icon: icons.IconBrandChrome, breadcrumbs: false },
        { id: 'settings', title: 'Settings', type: 'item', url: '/settings', icon: icons.IconBrandChrome, breadcrumbs: false }
    ]
};

export default services;
