// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Services',
    caption: 'Tools',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Notes',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        { id: 'passwords', title: 'Passwords', type: 'item', url: '/passwords', icon: icons.IconBrandChrome, breadcrumbs: false }
    ]
};

export default pages;
